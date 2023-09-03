import { IUser } from './user';
import { IPost } from './post';
import { ILike } from './like';

export interface IDbModel {
  users: IUser[];
  likes: ILike[];
  posts: IPost[];
}
