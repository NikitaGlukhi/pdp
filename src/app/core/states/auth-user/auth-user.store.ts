import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { AuthUserState } from './auth-user.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authUser', resettable: true, idKey: 'id' })
export class AuthUserStore extends EntityStore<AuthUserState> {
  constructor() {
    super();
  }
}
