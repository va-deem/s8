import React, { useState } from 'react';
import styles from './Menu.module.scss';
import cx from 'clsx';
import Image from 'next/image';

const Menu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleHamburgerClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoText}>
          QQCH
          <div className={styles.logoSlogan}>Personal space</div>
        </div>
      </div>
      <div className={styles.menu}>
        <button
          className={cx(
            styles.toggleBtn,
            'hamburger',
            'hamburger--collapse',
            isCollapsed && 'is-active'
          )}
          type="button"
          onClick={handleHamburgerClick}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <ul className={styles.items}>
          <li className={styles.item}>
            <Image
              src="/images/blog-icon.svg"
              className={styles.itemIcon}
              height={22}
              width={22}
              alt=""
            />
            <span className={styles.itemText}>Blog</span>
          </li>
          <li className={styles.item}>
            <Image
              src="/images/about-icon.svg"
              className={styles.itemIcon}
              height={22}
              width={22}
              alt=""
            />
            <span className={styles.itemText}>About</span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Menu;
