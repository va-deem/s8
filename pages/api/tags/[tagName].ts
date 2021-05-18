import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  // const { tagName }: { tagName: string } = req.query;

  if (req.method === 'GET') {
    try {
      const tag = await prisma.tag.findUnique({
        where: { name: req.query.tagName },
      });
      if (tag) {
        res.status(200).json({ tag });
      } else {
        res.status(404).end();
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await prisma.$disconnect();
    }
  }
};

export default handler;
