import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tagName } = req.query;

  if (req.method === 'GET' && typeof tagName === 'string') {
    try {
      const tags = await prisma.tag.findMany({
        where: { name: { startsWith: tagName } },
      });
      res.json(tags);
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await prisma.$disconnect();
    }
  }
};

export default handler;
