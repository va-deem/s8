import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
// import utilStyles from '../../styles/utils.module.scss';
import prisma from '../../lib/prisma';
import { PostInterface } from '../../types';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postData = await prisma.post.findUnique({
    where: { id: Number(params.id) },
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
    </Layout>
  );
}
