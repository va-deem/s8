import React from 'react';
import Link from 'next/link';
import Layout from '../../components/admin/layout';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { PostInterface } from '../../types';
import Date from '../../components/date';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return {
    props: { data },
  };
};

const AdminIndexPage = ({ data }: { data: PostInterface[] }) => {
  const router = useRouter();

  const handlePostDelete = async (id) => {
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
        <table>
          <thead>
          <td>Subject</td>
          <td>Date and time</td>
          <td>Actions</td>
          </thead>
          <tbody>
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
                  <button onClick={() => handlePostDelete(id)}>Delete</button>
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
