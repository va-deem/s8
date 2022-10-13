import Head from 'next/head';

export const siteTitle = 'QQCH | Personal space';

interface ILayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function LayoutMain({ children }: ILayoutProps) {
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
