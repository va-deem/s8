import Head from 'next/head';

export const siteTitle = 'S8 | Personal website';

interface ILayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A personal website with Next.js" />
        <meta name="og:title" content={siteTitle} />
        <title />
      </Head>
      <>{children}</>
    </>
  );
}
