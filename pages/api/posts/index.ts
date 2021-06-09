import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { TagInterface } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    subject,
    content,
    tags,
  }: { subject: string; content: string; tags: TagInterface[] } = req.body;

  const tagsToSave = tags.map((tag) => {
    const action = tag.__isNew__ ? 'create' : 'connect';

    return {
      tag: { [action]: { name: tag.name } },
    };
  });

  try {
    const post = await prisma.post.create({
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
};

export default handler;
