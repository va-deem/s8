export interface PostInterface {
  id: number;
  subject: string;
  content: string;
  contentHtml: string;
  isPublished?: boolean;
  createdAt?: Date;
  publishedAt?: Date;
}
