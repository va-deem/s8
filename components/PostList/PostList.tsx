import React from 'react';
import styles from './PostList.module.scss';
import Link from 'next/link';
import Date from '../Date/Date';
import Tags from '../Tags/Tags';
import { PostInterface } from '../../types';

interface IPostListProps {
  posts: PostInterface[];
}

const PostList = (props: IPostListProps) => {
  const { posts } = props;

  return (
    <>
      <ul className={styles.list}>
        {posts.map(({ id, subject, createdAt, tags }) => (
          <li className={styles.item} key={id}>
            <Link href={`/posts/${id}`}>
              <a className={styles.title}>{subject}</a>
            </Link>
            <p className={styles.details}>
              <Date date={createdAt} />
              <Tags tags={tags.map((t) => t.tag)} />
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
