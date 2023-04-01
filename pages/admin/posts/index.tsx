import Link from 'next/link';
import styles from './index.module.scss';
import AdminLayout from '../../../components/admin/adminLayout';
import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';
import { PostInterface } from '../../../types';
import Date from '../../../components/Date/Date';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Tags from '../../../components/Tags/Tags';
import { deletePost } from '../../../services/blogService';
import { signOut, useSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: { tags: { include: { tag: true } } },
  });
  return {
    props: { data },
  };
};

const AdminIndexPage = ({ data }: { data: PostInterface[] }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (!session) {
    return <div>{`Your status is: ${status}`}</div>;
  }

  const handlePostDelete = async (event, id) => {
    event.preventDefault();

    const answer = confirm('Are you sure you want to delete this post?');
    if (!answer) return;

    try {
      await deletePost(id);
      alert('Post deleted successfully!');
      await router.replace('/admin');
    } catch (e) {
      alert(e.response.status);
    }
  };

  return (
    <AdminLayout adminHome>
      <section className={styles.section}>
        <button onClick={() => signOut()}>Sign out</button>
        <div className={styles.newLink}>
          <Link href="/admin/posts/new">
            <a>Create a post</a>
          </Link>
        </div>
        <table className="blogs-table">
          <thead className="blogs-table__head">
            <tr>
              <th>Subject</th>
              <th>Date and time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map(({ id, subject, createdAt, tags }) => (
              <tr key={id}>
                <td>
                  <>
                    <Link href={`/admin/posts/${id}`}>
                      <a>{subject}</a>
                    </Link>
                    <Tags tags={tags.map((t) => t.tag)} />
                  </>
                </td>
                <td>
                  <Date date={createdAt} />
                </td>
                <td>
                  <Link href="/">
                    <a
                      role="button"
                      tabIndex={0}
                      className={styles['fa-icons']}
                      onClick={(e) => handlePostDelete(e, id)}
                      onKeyDown={(e) => handlePostDelete(e, id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </a>
                  </Link>

                  <Link href={`/posts/${id}`}>
                    <a className={styles['fa-icons']}>
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
};

export default AdminIndexPage;
