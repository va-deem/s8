import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/admin/layout';
import PostForm from '../../../components/admin/_post-form';
import { useRouter } from 'next/router';
import convertToHtml from '../../../lib/mdToHtml';
import { createPost } from '../../../services/blogService';

const CreatePost = () => {
  const router = useRouter();

  const handlePostCreate = async (formValues) => {
    formValues.contentHtml = convertToHtml(formValues.content);

    try {
      await createPost(formValues);
      alert('Post created successfully!');
      router.replace('/admin');
    } catch (e) {
      alert(e.response.status);
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
