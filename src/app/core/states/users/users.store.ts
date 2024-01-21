import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { UsersState } from './users.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', resettable: true, idKey: 'id' })
export class UsersStore extends EntityStore<UsersState> {
  constructor() {
    super();
  }
}
