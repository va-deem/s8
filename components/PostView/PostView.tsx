import React, { useEffect } from 'react';
import Date from '../Date/Date';
import { PostInterface } from '../../types';
import Tags from '../Tags/Tags';
import { useAppContext } from '../../context/AppContext';
import styles from './PostView.module.scss';

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
      <h1 className={styles.title}>{subject}</h1>
      <p className={styles.details}>
        <Date date={createdAt} />
        <Tags tags={tags.map((t) => t.tag)} />
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        className={styles.content}
      />
    </>
  );
};

export default PostView;
