import { ILike } from '../models';

export type PostText = {
  id: string;
  text: string;
  userId: string;
  likes: ILike[];
};
