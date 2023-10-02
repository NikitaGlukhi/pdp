import { BaseEntity } from './base-entity';

export interface ILike extends BaseEntity {
  postId: string;
  likedBy: string;
}
