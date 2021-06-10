import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import ustyles from '/styles/utils.module.scss';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { PostInterface } from '../types';
import Tags from '../components/tags';

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { tags: { include: { tag: true } } },
  });

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
        <ul className="post-list">
          {data.map(({ id, subject, createdAt, tags }) => (
            <li className="post-list__item" key={id}>
              <Link href={`/posts/${id}`}>
                <a className="post-list__title">{subject}</a>
              </Link>
              <p className="post-list__date">
                <Date date={createdAt} />
              </p>
              <Tags tags={tags.map((t) => t.tag)} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
