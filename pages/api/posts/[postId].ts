import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { TagInterface } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = Number(req.query.postId);

  if (req.method === 'PUT') {
    console.log('PUT body', req.body);
    const {
      subject,
      content,
      tags,
    }: { subject: string; content: string; tags: TagInterface[] } = req.body;

    let tagsToSave;
    if (tags.length) {
      tagsToSave = tags.map((tag) => {
        if (tag.__isNew__) {
          return { tag: { create: { name: tag.name } } };
        } else {
          return {
            tag: { connect: { id: tag.id } },
          };
        }
      });
    } else {
      tagsToSave = [];
    }
    console.log('tagsOnSave', tagsToSave);

    try {
      // Cascade delete doesn't work so using raw query
      // https://github.com/prisma/prisma/issues/2810
      // TODO: try plugin https://paljs.com/plugins/delete/
      await prisma.$executeRaw`DELETE FROM "TagsOnPosts" WHERE "TagsOnPosts"."postId"=${postId};`;

      const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: {
          subject,
          content,
          tags: { create: tagsToSave },
        },
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
      await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.status(204).end();
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await prisma.$disconnect();
    }
  }
};
export default handler;
