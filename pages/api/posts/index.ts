import { NextApiRequest, NextApiResponse } from 'next';
import { PostInterface } from '../../../types';
import { createPostWithTags, disconnectDb } from '../../../services/dbService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const postData: PostInterface = req.body;

  try {
    const post = await createPostWithTags(postData);
    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await disconnectDb();
  }
};
