import React, { useState } from 'react';
import styles from './Menu.module.scss';
import cx from 'clsx';
import MenuList from '../MenuList/MenuList';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';
import { Logo } from '../svg/Logo';

interface MenuInterface {
  resetTags?: () => void;
}

const Menu = (props: MenuInterface) => {
  const { resetTags } = props;
  const [isActive, setIsCollapsed] = useState(false);

  const { currentPage } = useAppContext();
  const router = useRouter();

  const handleLogoClick = async () => {
    if (currentPage === 'postView') {
      await router.replace('/');
    } else {
      resetTags();
    }
  };

  const handleHamburgerClick = () => {
    setIsCollapsed(!isActive);
  };

  return (
    <header className={styles.header}>
      <div
        className={styles.logo}
        onClick={handleLogoClick}
        onKeyDown={handleLogoClick}
        role={'button'}
        tabIndex={0}
      >
        <Logo />
        <div className={styles.logoSlogan}>Personal space</div>
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
