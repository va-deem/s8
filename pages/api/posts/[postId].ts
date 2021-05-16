import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query;

  if (req.method === 'PUT') {
    const { subject, content }: { subject: string; content: string } = req.body;

    try {
      const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: {
          subject,
          content,
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
