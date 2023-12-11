import { AlertTypes } from '../enums';

export interface IAlert {
  id: string;
  time: number;
  type: AlertTypes;
  heading: string;
  body: string;
}
