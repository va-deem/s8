import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/layout';
import prisma from '../../lib/prisma';
import { PostInterface } from '../../types';
import Menu from '../../components/menu';
import PostView from '../../components/postView';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postData = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { tags: { include: { tag: true } } },
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
      <main className="content">
        <div className="content__back">
          <Link href="/">
            <a>&larr; Recent posts</a>
          </Link>
        </div>
        <PostView postData={postData} />
      </main>
    </Layout>
  );
}
