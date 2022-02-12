import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Layout, { siteTitle } from '../components/layout';
import { PostInterface, TagInterface } from '../types';
import Tags from '../components/tags';
import PostList from '../components/postList';
import Menu from '../components/menu';
import checkCommonTags from '../utils/checkCommonTags';

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { tags: { include: { tag: true } } },
  });

  const tags = await prisma.tag.findMany();

  return {
    props: { data, tags },
  };
};

interface IHomeProps {
  data: PostInterface[];
  tags: TagInterface[];
}

export default function Home(props: IHomeProps) {
  const { data, tags } = props;
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [filteredData, setFilteredData] = useState<Array<PostInterface>>(data);

  useEffect(() => {
    if (selectedTags.length) {
      setFilteredData(
        data.filter((post) => {
          const postTagNames = post.tags.map((tag) => tag.tag.name);
          return checkCommonTags(selectedTags, postTagNames);
        })
      );
    } else {
      setFilteredData(data);
    }
  }, [data, selectedTags]);

  const selectTag = (e) => {
    const tagName = e.target.textContent;

    if (selectedTags.includes(tagName)) {
      setSelectedTags((selectedTags) => selectedTags.filter((name) => name !== tagName));
    } else {
      setSelectedTags((selectedTags) => [...selectedTags, tagName]);
    }
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Menu />
      <main className="content">
        <PostList data={filteredData} />
      </main>
      <aside className={'tags'}>
        <Tags tags={tags} selectTag={selectTag} selectedTags={selectedTags} />
      </aside>
    </Layout>
  );
}
