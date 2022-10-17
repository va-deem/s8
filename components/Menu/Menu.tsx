import React, { useState } from 'react';
import styles from './Menu.module.scss';
import cx from 'clsx';
import MenuList from '../MenuList/MenuList';

interface MenuInterface {
  resetTags?: () => void;
}

const Menu = (props: MenuInterface) => {
  const { resetTags } = props;
  const [isActive, setIsCollapsed] = useState(false);

  const handleHamburgerClick = () => {
    setIsCollapsed(!isActive);
  };

  return (
    <header className={styles.header}>
      <div
        className={styles.logo}
        onClick={resetTags}
        onKeyDown={resetTags}
        role={'button'}
        tabIndex={0}
      >
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
            isActive && 'is-active'
          )}
          type="button"
          onClick={handleHamburgerClick}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <MenuList isActive={isActive} />
      </div>
    </header>
  );
};

export default Menu;
