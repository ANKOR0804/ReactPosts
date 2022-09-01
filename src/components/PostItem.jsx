import React from 'react';
import ButtonDefault from './UI/button/ButtonDefault';
import {useNavigate} from 'react-router-dom';

const PostItem = (props) => {
  const router = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        <strong>{props.post.id}. {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <ButtonDefault onClick={() => router(`/posts/${props.post.id}`)}>
          Open
        </ButtonDefault>
        <ButtonDefault onClick={() => props.remove(props.post)}>
          Delete
        </ButtonDefault>
      </div>
    </div>
  );
};

export default PostItem;