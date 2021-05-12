import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import ustyles from '../styles/utils.module.scss';
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
      <section className={`${ustyles.headingMd} ${ustyles.padding1px}`}>
        <h1 className={ustyles.headingXl}>Recent posts</h1>
        <hr />
        <ul className={ustyles.postlist}>
          {data.map(({ id, subject, createdAt }) => (
            <li className={ustyles.postlist__item} key={id}>
              <Link href={`/posts/${id}`}>
                <a className={ustyles.postlist__title}>{subject}</a>
              </Link>
              <p className={ustyles.postlist__date}>
                <Date date={createdAt} />
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
