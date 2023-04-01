import React from 'react';
import Head from 'next/head';
import styles from './LayoutMain.module.scss';

export const siteTitle = 'QQCH | Personal space';

interface ILayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function LayoutMain({ children, title }: ILayoutProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A personal website with Next.js" />
        <meta name="og:title" content={siteTitle} />
        <title>{title}</title>
        <link
          rel="preload"
          href="/fonts/Fira_Sans/FiraSans-Regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <div className={styles.container}>{children}</div>
    </>
  );
}
