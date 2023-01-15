import React, { useEffect } from 'react';
import Date from '../Date/Date';
import { PostInterface } from '../../types';
import Tags from '../Tags/Tags';
import { useAppContext } from '../../context/AppContext';

interface IPostViewProps {
  postData: PostInterface;
}

const PostView = (props: IPostViewProps) => {
  const { subject, createdAt, tags, contentHtml } = props.postData;

  const { setCurrentPage } = useAppContext();

  useEffect(() => {
    setCurrentPage('postView');
  }, [setCurrentPage]);

  return (
    <>
      <h1 className="post-view__title">{subject}</h1>
      <p className="post-view__details">
        <Date date={createdAt} />
        <Tags tags={tags.map((t) => t.tag)} />
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        className="post-view__content"
      />
    </>
  );
};

export default PostView;
