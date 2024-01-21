import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';

import { UsersState } from './users.state';
import { UsersStore } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState> {
  constructor(protected readonly usersStore: UsersStore) {
    super(usersStore);
  }
}
