import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { subject, content, tags }: { subject: string; content: string; tags: string[] } = req.body;
  console.log('server', tags);
  const tagsToSave = tags.map((tagName: string) => ({
    tag: {
      create: { name: tagName },
    },
  }));
  console.log('tagsToSave', tagsToSave);

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
