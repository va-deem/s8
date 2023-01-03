import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import LayoutMain from '../../components/LayoutMain/LayoutMain';
import { PostInterface } from '../../types';
import Menu from '../../components/Menu/Menu';
import PostView from '../../components/PostView/PostView';
import { getPost } from '../../services/dbService';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const post = await getPost(params.id);
    return {
      props: { post },
    };
  } catch (e) {
    console.log(e);
  }
};

export default function Post({ post }: { post: PostInterface }) {
  return (
    <LayoutMain>
      <Head>
        <title>{post.subject}</title>
      </Head>
      <Menu />
      <main className="content">
        <PostView postData={post} />
        <div className="content__back">
          <Link href="/">
            <a>&larr; All posts</a>
          </Link>
        </div>
      </main>
    </LayoutMain>
  );
}
