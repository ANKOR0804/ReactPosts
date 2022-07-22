import React from 'react';
import ButtonDefault from './UI/button/ButtonDefault';

const PostItem = (props) => {

  return (
    <div className="post">
      <div className="post__content">
        <strong>{props.number}. {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <ButtonDefault onClick={() => props.remove(props.post)}>
          Delete
        </ButtonDefault>
      </div>
    </div>
  );
};

export default PostItem;