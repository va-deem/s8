import axios from 'axios';

const postsInstance = axios.create({ baseURL: '/api/posts/' });

export const createPost = (newPost) => {
  return postsInstance.post('', newPost);
};

export const updatePost = (id, postToUpdate) => {
  return postsInstance.put(String(id), postToUpdate);
};

export const deletePost = (id) => {
  return postsInstance.delete(String(id));
};
