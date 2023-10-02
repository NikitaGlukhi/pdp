import { BaseEntity } from './base-entity';
import { ILike } from './like';

export interface IPost extends BaseEntity {
  text: string;
  userId: string;
  image?: string;
  likes: ILike[];
}
