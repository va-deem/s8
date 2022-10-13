import { NextApiRequest, NextApiResponse } from 'next';
import { disconnectDb, getTagsByName } from '../../../services/dbService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tagName } = req.query;

  if (req.method === 'GET' && typeof tagName === 'string') {
    try {
      const tags = await getTagsByName(tagName);
      res.json(tags);
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await disconnectDb();
    }
  }
};
