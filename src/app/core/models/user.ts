import { IPost } from './post';

export interface IUser {
  id: string;
  fullName: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  password: string;
  photo: string;
  posts?: IPost[];
}
