import React from 'react';
import styles from '../MenuList/MenuList.module.scss';
import Image from 'next/image';
import cx from 'clsx';

interface MenuListProps {
  isActive: boolean;
}

const MenuList = (props: MenuListProps) => {
  const { isActive } = props;

  return (
    <div className={cx(styles.menuList, isActive && styles.active)}>
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
  );
};

export default MenuList;
