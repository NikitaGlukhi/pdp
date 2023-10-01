import { ILike } from './like';

export interface IPost {
  id: string;
  text: string;
  userId: string;
  image?: string;
  createdAt: number;
  likes: ILike[];
}
