import { Injectable } from '@angular/core';

import { tap, Observable } from 'rxjs';

import { UsersStore } from './users.store';
import { UsersQuery } from './users.query';
import { IUser } from '../../models';
import { UserApiService } from '../../services';

@Injectable({ providedIn: 'root' })
export class UsersStateService {
  constructor(
    private readonly store: UsersStore,
    private readonly query: UsersQuery,
    private readonly usersApiService: UserApiService,
  ) {}

  load(): Observable<IUser[]> {
    return this.usersApiService.getAll()
      .pipe(tap(users => this.store.set(users)));
  }

  selectAll(): Observable<IUser[]> {
    return this.query.selectAll();
  }

  reset(): void {
    this.store.reset();
  }
}
