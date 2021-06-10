import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/admin/layout';
import PostForm from '../../../components/admin/_post-form';
import { useRouter } from 'next/router';
import convertToHtml from '../../../lib/mdToHtml';

const CreatePost = () => {
  const router = useRouter();

  const handlePostCreate = async (formValues) => {
    formValues.contentHtml = convertToHtml(formValues.content);

    try {
      const response = await fetch('/api/posts', {
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      } else {
        alert('Post created successfully!');
        router.replace('/admin');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <PostForm submitForm={handlePostCreate} />
      </section>
    </Layout>
  );
};

export default CreatePost;
