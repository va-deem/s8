import Head from 'next/head';
import Image from 'next/image';
import styles from '../layout.module.scss';
import utilStyles from '../../styles/utils.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

const name = 'Vadim';
export const siteTitle = 'Admin section';

export default function Layout({
  children,
  adminHome,
}: {
  children: React.ReactNode;
  adminHome?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <aside className={styles.sideBlock}>
        <Link href="/">
          <a>
            <Image
              priority
              src="/images/avatar.jpg"
              className={utilStyles.borderCircle}
              height={108}
              width={108}
              alt={name}
            />
          </a>
        </Link>
        <Link href="/">
          <a className="noLink">
            <h1>S8 Blog | Admin</h1>
          </a>
        </Link>
        <p>
          <Link href="/admin">
            <a className="link">Dashboard</a>
          </Link>
        </p>
        <p className="link-auth">
          <Link href="/">
            <a className="fa-icons with-text">
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            </a>
          </Link>
        </p>
      </aside>

      <main className={styles.contentBlock}>
        <div>{children}</div>
        {/*{!adminHome && (*/}
        {/*  <div className={styles.backToHome}>*/}
        {/*    <Link href="/admin">*/}
        {/*      <a>← Back</a>*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*)}*/}
      </main>
    </div>
  );
}
