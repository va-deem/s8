import Layout, { siteTitle } from '../../components/admin/layout';
import Head from 'next/head';
import PostForm from '../../components/admin/_post-form';

const CreatePost = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <PostForm />
      </section>
    </Layout>
  );
};

export default CreatePost;
