import { BaseEntity } from './base-entity';
import { IPost } from './post';

export interface IUser extends BaseEntity {
  id: string;
  fullName: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  password: string;
  photo: string;
  posts?: IPost[];
}
