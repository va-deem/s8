import React from 'react';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/admin/layout';

const AdminIndexPage = () => {
  return (
    <Layout adminHome>
      <div>
        <Link href="/admin/create-post">
          <a>Create a post</a>
        </Link>
      </div>
    </Layout>
  );
};

export default AdminIndexPage;
