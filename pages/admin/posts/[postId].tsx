import Head from 'next/head';
import AdminLayout, { siteTitle } from '../../../components/admin/adminLayout';
import PostForm from '../../../components/admin/_post-form';
import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';
import { PostInterface } from '../../../types';
import { useRouter } from 'next/router';
import convertToHtml from '../../../lib/mdToHtml';
import { updatePost } from '../../../services/blogService';
import styles from '/styles/admin/updatePost.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postData = await prisma.post.findUnique({
    where: { id: Number(params.postId) },
    include: { tags: { include: { tag: true } } },
  });

  return {
    props: { postData },
  };
};

const UpdatePost = ({ postData }: { postData: PostInterface }) => {
  const router = useRouter();

  const handlePostUpdate = async (formValues) => {
    formValues.contentHtml = convertToHtml(formValues.content);

    try {
      const response = await updatePost(postData.id, formValues);
      alert('Post updated successfully!');
      await router.replace(`/posts/${response.data.post.id}`);
    } catch (e) {
      alert(e.response.status);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className={styles.content}>
        <PostForm submitForm={handlePostUpdate} postData={postData} />
      </main>
    </AdminLayout>
  );
};

export default UpdatePost;
