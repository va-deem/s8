import Head from 'next/head';
import Layout, { siteTitle } from '../../../components/admin/layout';
import PostForm from '../../../components/admin/_post-form';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const router = useRouter();

  const handlePostCreate = async (event) => {
    event.preventDefault();
    console.log(event.target.tags.value)
    let tagsArr;
    if (event.target.tags.value) {
      tagsArr = event.target.tags.value.split(',').map((t) => t.trim());
    }
    console.log(tagsArr);

    try {
      const response = await fetch('/api/posts', {
        body: JSON.stringify({
          subject: event.target.subject.value,
          content: event.target.content.value,
          tags: tagsArr,
        }),
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