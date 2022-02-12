import Head from 'next/head';

export const siteTitle = 'S8 blog';

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A personal website with Next.js" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <>{children}</>
    </>
  );
}
