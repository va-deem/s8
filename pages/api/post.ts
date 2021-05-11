import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const { subject, content }: { subject: string; content: string } = req.body;

  console.log(subject, content);
  try {
    const post = await prisma.post.create({ data: { subject, content } });
    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
};

export default createPost;
