import React from 'react';
import Image from 'next/image';
import styles from './MenuItem.module.scss';
import Link from 'next/link';
import cx from 'clsx';
import { useRouter } from 'next/router';

interface MenuItemProps {
  name: string;
  url: string;
  icon: string;
}

const MenuItem = (props: MenuItemProps) => {
  const { name, url, icon } = props;
  const router = useRouter();

  return (
    <Link href={url}>
      <a
        className={cx(
          styles.item,
          router.pathname === url && styles.itemActive
        )}
      >
        <Image
          src={icon}
          className={styles.itemIcon}
          height={22}
          width={22}
          alt=""
        />
        <span className={styles.itemText}>{name}</span>
      </a>
    </Link>
  );
};

export default MenuItem;
