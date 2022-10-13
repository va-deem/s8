import Head from 'next/head';
import styles from '/styles/admin/adminLayout.module.scss';

export const siteTitle = 'S8 blog admin';

export default function AdminLayout({
  children,
  adminHome,
}: {
  children: React.ReactNode;
  adminHome?: boolean;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A personal website with Next.js" />
        <meta name="og:title" content="Admin section" />
      </Head>
      <main className={styles.content}>
        <>{children}</>
      </main>
    </>
  );
}
