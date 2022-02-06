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
    <main className="content">
      <section>
        <ul className="post-list">
          {data.map(({ id, subject, createdAt, tags }) => (
            <li className="post-list__item" key={id}>
              <Link href={`/posts/${id}`}>
                <a className="post-list__title">{subject}</a>
              </Link>
              <p className="post-list__date">
                <Date date={createdAt} />
              </p>
              <Tags tags={tags.map((t) => t.tag)} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default PostList;
