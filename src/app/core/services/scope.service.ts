import { Injectable } from '@angular/core';

import { IUser } from '../models';

@Injectable()
export class ScopeService {
  isAdmin(user: IUser): boolean {
    return user.role === 'admin';
  }
}
