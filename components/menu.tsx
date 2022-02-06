import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const name = 'Vadim';

const Menu = () => {
  return (
    <aside className="menu">
      <Link href="/">
        <a>
          <Image
            priority
            src="/images/avatar.jpg"
            className="layout__menu__avatar"
            height={108}
            width={108}
            alt={name}
          />
        </a>
      </Link>
      <Link href="/">
        <a className="noLink">
          <h1>S8 Blog</h1>
        </a>
      </Link>
      <Link href="/">
        <a className="link">Posts</a>
      </Link>
      <Link href="/about">
        <a className="link">About</a>
      </Link>
      <p className="layout__menu__link-auth">
        <Link href="/admin">
          <a className="fa-icons with-text">
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </a>
        </Link>
      </p>
    </aside>
  );
};

export default Menu;
