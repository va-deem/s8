import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import LayoutMain, { siteTitle } from '../components/LayoutMain/LayoutMain';
import { PostInterface, TagInterface } from '../types';
import Tags from '../components/Tags/Tags';
import PostList from '../components/PostList/PostList';
import Menu from '../components/Menu/Menu';
import checkCommonTags from '../utils/checkCommonTags';
import { getPosts, getTags } from '../services/dbService';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await getPosts();
    const tags = await getTags();

    return {
      props: { posts, tags },
    };
  } catch (e) {
    console.log(e.message);
  }
};

interface IHomeProps {
  posts: PostInterface[];
  tags: TagInterface[];
}

export default function Home(props: IHomeProps) {
  const { posts, tags } = props;
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [filteredData, setFilteredData] = useState<Array<PostInterface>>(posts);

  useEffect(() => {
    if (selectedTags.length) {
      setFilteredData(
        posts.filter((post) => {
          const postTagNames = post.tags.map((tag) => tag.tag.name);
          return checkCommonTags(selectedTags, postTagNames);
        })
      );
    } else {
      setFilteredData(posts);
    }
  }, [posts, selectedTags]);

  const selectTag = (e: React.MouseEvent | React.KeyboardEvent) => {
    const tag = e.target as HTMLElement;
    const tagName = tag.textContent;

    if (selectedTags.includes(tagName)) {
      setSelectedTags((selectedTags) =>
        selectedTags.filter((name) => name !== tagName)
      );
    } else {
      setSelectedTags((selectedTags) => [...selectedTags, tagName]);
    }
  };

  return (
    <LayoutMain home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Menu />
      <main className="content">
        <PostList posts={filteredData} />
      </main>
      <aside className="tags">
        <Tags tags={tags} selectTag={selectTag} selectedTags={selectedTags} />
      </aside>
    </LayoutMain>
  );
}
