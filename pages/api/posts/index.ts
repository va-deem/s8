import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { subject, content }: { subject: string; content: string } = req.body;

  try {
    const post = await prisma.post.create({ data: { subject, content } });
    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
