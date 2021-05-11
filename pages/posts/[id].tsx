import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.scss';
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
      <article>
        <h1 className={utilStyles.headingXl}>{postData.subject}</h1>
        <div className={utilStyles.lightText}>
          <Date date={postData.createdAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}
