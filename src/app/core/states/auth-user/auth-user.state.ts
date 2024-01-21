import { EntityState } from '@datorama/akita';
import { IUser } from '../../models';

export interface AuthUserState extends EntityState<IUser> {}
