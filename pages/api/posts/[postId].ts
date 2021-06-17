import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { PostInterface } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = Number(req.query.postId);

  if (req.method === 'PUT') {
    const postData: PostInterface = req.body;

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

    try {
      await prisma.$executeRaw`DELETE FROM "TagsOnPosts" WHERE "TagsOnPosts"."postId"=${postId};`;

      const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: postToUpdate(postData),
      });

      res.status(200).json({ post });
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await prisma.$disconnect();
    }
  }

  if (req.method === 'DELETE') {
    try {
      // await prisma.post.delete({
      //   where: { id: Number(postId) },
      // });
      // Cascade delete isn't supported yet so use raw query
      // https://github.com/prisma/prisma/issues/2810
      await prisma.$executeRaw`DELETE FROM "Post" WHERE "Post"."id"=${postId};`;
      res.status(204).end();
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await prisma.$disconnect();
    }
  }
};

export default handler;
