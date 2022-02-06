import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const tags = await prisma.tag.findMany();
      res.json(tags);
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await prisma.$disconnect();
    }
  }
};

export default handler;
