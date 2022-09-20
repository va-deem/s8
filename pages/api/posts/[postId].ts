import { NextApiRequest, NextApiResponse } from 'next';
import { PostInterface } from '../../../types';
import {
  deletePostFromDb,
  disconnectDb,
  updatePostWithTags,
} from '../../../services/dbService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = Number(req.query.postId);
  const postData: PostInterface = req.body;

  if (req.method === 'PUT') {
    try {
      const post = await updatePostWithTags(postData);
      res.status(200).json({ post });
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await disconnectDb();
    }
  }

  if (req.method === 'DELETE') {
    try {
      await deletePostFromDb(postId);
      res.status(204).end();
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      await disconnectDb();
    }
  }
};
