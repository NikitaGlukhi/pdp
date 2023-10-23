import { ILike } from '../models';

export type PostImage = {
  id: string;
  imgUrl: string;
  text?: string;
  userId: string;
  likes: ILike[];
};