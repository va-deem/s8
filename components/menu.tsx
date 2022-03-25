import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Menu = () => {
  return (
    <aside className="menu">
      <Link href="/">
        <a className="menu__link">
          <div className="menu__image-wrapper">
            <Image
              priority
              src="/images/avatar.jpg"
              className="menu__avatar"
              height={108}
              width={108}
              alt={'Avatar'}
            />
          </div>
        </a>
      </Link>
      <div className={'menu__text-links'}>
        <Link href="/">
          <a className="menu__link">
            <h1 className="menu__title">Blog</h1>
          </a>
        </Link>
        <p className={'menu__slogan'}>My developer&apos;s blog</p>
      </div>
    </aside>
  );
};

export default Menu;
