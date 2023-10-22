import { IUser } from './user';
import { ILike } from './like';
import { FeaturedPost } from '../types/featured-post';

export interface IDbModel {
  users: IUser[];
  likes: ILike[];
  posts: FeaturedPost[];
}
