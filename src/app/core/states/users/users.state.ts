import { EntityState } from '@datorama/akita';
import { IUser } from '../../models';

export interface UsersState extends EntityState<IUser> {}
