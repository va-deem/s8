export interface PostInterface {
  id: number;
  subject: string;
  content: string;
  contentHtml: string;
  tags: TagInterface[];
  isPublished?: boolean;
  createdAt?: Date;
  publishedAt?: Date;
}

export interface TagInterface {
  id: number;
  name: string;
  tag?: { id: number; name: string };
  createdAt?: Date;
}
