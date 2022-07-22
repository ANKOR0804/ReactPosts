import React, {useState} from 'react';
import InputDefault from './UI/input/InputDefault';
import ButtonDefault from './UI/button/ButtonDefault';

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''})

  const addNewPosts = (e) => {
    e.preventDefault();

    const newPost = {
      ...post,
      id: Date.now()
    };

    create(newPost);
    setPost({title: '', body: ''})
  }

  return (
    <form>
      <InputDefault
        value={post.title}
        onChange={e => setPost({...post, title: e.target.value})}
        type="text"
        placeholder="Post name"
      />
      <InputDefault
        value={post.body}
        onChange={e => setPost({...post, body: e.target.value})}
        type="text"
        placeholder="Post body"/>
      <ButtonDefault onClick={addNewPosts}>Add post</ButtonDefault>
    </form>
  );
};

export default PostForm;