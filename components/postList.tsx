import React from 'react';
import Link from 'next/link';
import Date from './date';
import Tags from './tags';
import { PostInterface } from '../types';

interface IPostListProps {
  data: PostInterface[];
}

const PostList = (props: IPostListProps) => {
  const { data } = props;

  return (
    <>
      <h1 className="post-view__title">Recent posts</h1>
      <ul className="post-list">
        {data.map(({ id, subject, createdAt, tags }) => (
          <li className="post-list__item" key={id}>
            <Link href={`/posts/${id}`}>
              <a className="post-list__title">{subject}</a>
            </Link>
            <p className="post-list__details">
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
