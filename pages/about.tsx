import React from 'react';
import LayoutMain, { siteTitle } from '../components/LayoutMain/LayoutMain';
import Menu from '../components/Menu/Menu';

const About = () => {
  return (
    <LayoutMain title={siteTitle}>
      <Menu />
      <main className="content">
        <div>About - page</div>
      </main>
    </LayoutMain>
  );
};

export default About;
