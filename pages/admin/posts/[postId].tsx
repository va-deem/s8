import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/admin/layout';
import PostForm from '../../../components/admin/_post-form';
import { GetServerSideProps } from 'next';
import prisma from '../../../lib/prisma';
import { PostInterface } from '../../../types';
import { useRouter } from 'next/router';
import convertToHtml from '../../../lib/mdToHtml';

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
      const response = await fetch(`/api/posts/${postData.id}`, {
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      } else {
        alert('Post updated successfully!');
        router.replace(`/posts/${postData.id}`);
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
        <PostForm submitForm={handlePostUpdate} postData={postData} />
      </section>
    </Layout>
  );
};

export default UpdatePost;
