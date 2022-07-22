import React, {useEffect, useState} from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import ModalDefault from './components/UI/modal/ModalDefault';
import ButtonDefault from './components/UI/button/ButtonDefault';
import {usePosts} from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/loader/Loader';
import {useFetching} from './hooks/useFetching';
import {getPagesCount} from './utils/pagination';
import {usePagination} from "./hooks/usePagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];

    setTotalPages(getPagesCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts();
  }, [])

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const pagination = usePagination(totalPages);
  console.log(pagination)

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (oldPost) => {
    setPosts(posts.filter(item => item.id !== oldPost.id));
  }

  return (
    <div className="App">
      <ButtonDefault onClick={() => setModal(true)}>
        Create Post
      </ButtonDefault>
      <ModalDefault visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </ModalDefault>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Error - {postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts list 1"/>}
    </div>
  );
}

export default App;
