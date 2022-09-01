import React, {useEffect, useRef, useState} from 'react';
import '../styles/App.css';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pagination";
import {usePosts} from "../hooks/usePosts";
import ButtonDefault from "../components/UI/button/ButtonDefault";
import ModalDefault from "../components/UI/modal/ModalDefault";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import SelectDefault from "../components/UI/select/SelectDefault";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];

    setTotalPages(getPagesCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (oldPost) => {
    setPosts(posts.filter(item => item.id !== oldPost.id));
  }

  const changePage = (page) => {
    setPage(page);
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
      <SelectDefault
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Number of elements on page"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all'},
        ]}
      />
      {postError &&
        <h1>Error - {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts list"/>
      <div ref={lastElement} style={{height: 0}}/>
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px', marginBottom: '30px'}}>
          <Loader/>
        </div>
      }
      {/*<Pagination*/}
      {/*  page={page}*/}
      {/*  changePage={changePage}*/}
      {/*  totalPages={totalPages}*/}
      {/*/>*/}
    </div>
  );
}

export default Posts;
