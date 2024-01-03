import { BaseEntity } from './base-entity';
import { FeaturedPost } from '../types/featured-post';

export interface IUser extends BaseEntity {
  fullName: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  password: string;
  photo: string;
  role: string;
  posts?: FeaturedPost[];
}
