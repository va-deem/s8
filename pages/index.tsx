import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { PostInterface } from '../types';

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.post.findMany();

  return {
    props: { data },
  };
};

export default function Home({ data }: { data: PostInterface[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>Blog</h1>
        <ul className={utilStyles.list}>
          {data.map(({ id, subject, createdAt }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{subject}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date date={createdAt} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
