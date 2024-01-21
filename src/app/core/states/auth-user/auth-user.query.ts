import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AuthUserState } from './auth-user.state';
import { AuthUserStore } from './auth-user.store';

@Injectable({ providedIn: 'root' })
export class AuthUserQuery extends QueryEntity<AuthUserState> {
  constructor(protected readonly authUserStore: AuthUserStore) {
    super(authUserStore);
  }
}
