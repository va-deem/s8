import styles from '/styles/admin/adminIndexPage.module.scss';
import AdminLayout from '../../components/admin/adminLayout';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const AdminIndexPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  function handleClick() {
    router.push('/admin/posts');
  }

  return (
    <AdminLayout adminHome>
      <section className={styles.section}>
        {session ? (
          <>
            <p>Signed in as {session?.user?.email}</p>
            <button onClick={handleClick}>Go to posts</button>
            <p>or</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <p>Not signed in, status: {status}</p>
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminIndexPage;
