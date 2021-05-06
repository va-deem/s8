import Layout, { siteTitle } from '../../components/admin/layout';
import Head from 'next/head';
import Form from './_form';

export default function CreatePost() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <Form />
      </section>
    </Layout>
  );
}
