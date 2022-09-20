import prisma from '../lib/prisma';
import { PostInterface } from '../types';

export const getPosts = async () => {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { tags: { include: { tag: true } } },
  });
};

export const getPost = async (id) => {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { tags: { include: { tag: true } } },
  });
};

export const getTags = async () => await prisma.tag.findMany();

export const getTagsByName = async (tagName) => {
  return await prisma.tag.findMany({
    where: { name: { startsWith: tagName } },
  });
};

export const createPostWithTags = async (postData: PostInterface) => {
  const postToCreate = (postData: PostInterface) => {
    let tagsToSave = [];

    if (postData.tags.length) {
      tagsToSave = postData.tags.map((tag) => {
        return tag.isNew
          ? { tag: { create: { name: tag.name } } }
          : { tag: { connect: { id: tag.id } } };
      });
    }

    return { ...postData, tags: { create: tagsToSave } };
  };

  return await prisma.post.create({
    data: postToCreate(postData),
  });
};

export const updatePostWithTags = async (postData: PostInterface) => {
  const postToUpdate = (postData: PostInterface) => {
    let tagsToSave = [];

    if (postData.tags.length) {
      tagsToSave = postData.tags.map((tag) => {
        return tag.isNew
          ? { tag: { create: { name: tag.name } } }
          : { tag: { connect: { id: tag.id } } };
      });
    }

    return { ...postData, tags: { create: tagsToSave } };
  };

  await prisma.$executeRaw`DELETE FROM "TagsOnPosts" WHERE "TagsOnPosts"."postId"=${postData.id};`;

  return await prisma.post.update({
    where: { id: Number(postData.id) },
    data: postToUpdate(postData),
  });
};

export const deletePostFromDb = async (id) => {
  // await prisma.post.delete({
  //   where: { id: Number(postId) },
  // });
  // Cascade delete isn't supported yet so use raw query
  // https://github.com/prisma/prisma/issues/2810
  return await prisma.$executeRaw`DELETE FROM "Post" WHERE "Post"."id"=${id};`;
};

export const disconnectDb = async () => await prisma.$disconnect();
