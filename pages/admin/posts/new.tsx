import Head from 'next/head';
import AdminLayout, { siteTitle } from '../../../components/admin/adminLayout';
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
    <AdminLayout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <PostForm submitForm={handlePostCreate} />
      </section>
    </AdminLayout>
  );
};

export default CreatePost;
