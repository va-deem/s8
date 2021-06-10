import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { PostInterface } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postData: PostInterface = req.body;

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

  try {
    const post = await prisma.post.create({
      data: postToCreate(postData),
    });

    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
