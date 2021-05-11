import Layout, { siteTitle } from '../../components/admin/layout';
import Head from 'next/head';
import PostForm from '../../components/admin/_post-form';

const CreatePost = () => {
  const createPost = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/post', {
      body: JSON.stringify({
        subject: event.target.subject.value,
        content: event.target.content.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    console.log('RES', result);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <PostForm createPost={createPost} />
      </section>
    </Layout>
  );
};

export default CreatePost;
