import React from 'react';
import Link from 'next/link';
import Layout from '../../components/admin/layout';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { PostInterface } from '../../types';
import Date from '../../components/date';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  });
  return {
    props: { data },
  };
};

const AdminIndexPage = ({ data }: { data: PostInterface[] }) => {
  const router = useRouter();

  const handlePostDelete = async (event, id) => {
    event.preventDefault();

    const answer = confirm('Are you sure you want to delete this post?');
    if (!answer) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      } else {
        alert('Post deleted successfully!');
        router.replace('/admin');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Layout adminHome>
      <div>
        <Link href="/admin/posts/new">
          <a>Create a post</a>
        </Link>
      </div>

      <section className="blogs-section">
        <table className="blogs-table">
          <thead className="blogs-table__head">
            <tr>
              <th>Subject</th>
              <th>Date and time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="blogs-table__body">
            {data.map(({ id, subject, createdAt }) => (
              <tr key={id}>
                <td>
                  <Link href={`/admin/posts/${id}`}>
                    <a>{subject}</a>
                  </Link>
                </td>
                <td>
                  <Date date={createdAt} />
                </td>
                <td>
                  <Link href="/">
                    <a
                      role="button"
                      tabIndex={0}
                      className="fa-icons"
                      onClick={(e) => handlePostDelete(e, id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </a>
                  </Link>

                  <Link href={`/posts/${id}`}>
                    <a className="fa-icons">
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
};

export default AdminIndexPage;
