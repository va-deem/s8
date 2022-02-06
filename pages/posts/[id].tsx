import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/layout';
import Date from '../../components/date';
import prisma from '../../lib/prisma';
import { PostInterface } from '../../types';
import Menu from '../../components/menu';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postData = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: {
      tags: true,
    },
  });

  return {
    props: { postData },
  };
};

export default function Post({ postData }: { postData: PostInterface }) {
  return (
    <Layout>
      <Head>
        <title>{postData.subject}</title>
      </Head>
      <Menu />
      <section>
        <article className="post-view">
          <h1 className="post-view__title">{postData.subject}</h1>
          <div className="post-view__date">
            <Date date={postData.createdAt} />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            className="post-view__content"
          />
        </article>
        <div className="layout__back">
          <Link href="/">
            <a>&larr; Back</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
