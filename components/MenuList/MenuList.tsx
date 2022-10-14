import React from 'react';
import styles from './MenuList.module.scss';
import cx from 'clsx';
import MenuItem from '../MenuItem/MenuItem';

interface MenuListProps {
  isActive: boolean;
}

const MenuList = (props: MenuListProps) => {
  const { isActive } = props;

  return (
    <div className={cx(styles.menuList, isActive && styles.active)}>
      <ul className={styles.items}>
        <li>
          <MenuItem name="Blog" url="/" icon="/images/blog-soo.png" />
        </li>
        <li>
          <MenuItem name="About" url="/about" icon="/images/about-soo.png" />
        </li>
      </ul>
    </div>
  );
};

export default MenuList;
