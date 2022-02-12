import React from 'react';
import Date from './date';
import { PostInterface } from '../types';

const PostView = ({ postData }: { postData: PostInterface }) => {
  return (
    <>
      <h1 className="post-view__title">{postData.subject}</h1>
      <div className="post-view__date">
        <Date date={postData.createdAt} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        className="post-view__content"
      />
    </>
  );
};

export default PostView;
