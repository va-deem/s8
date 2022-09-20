import { NextApiRequest, NextApiResponse } from 'next';
import { disconnectDb, getTags } from '../../../services/dbService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const tags = await getTags();
      res.json(tags);
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await disconnectDb();
    }
  }
};
