import React from 'react';
import LayoutMain, { siteTitle } from '../components/LayoutMain/LayoutMain';
import Head from 'next/head';
import Menu from '../components/Menu/Menu';

const About = () => {
  return (
    <LayoutMain home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Menu />
      <main className="content">
        <div>About - page</div>
      </main>
    </LayoutMain>
  );
};

export default About;
