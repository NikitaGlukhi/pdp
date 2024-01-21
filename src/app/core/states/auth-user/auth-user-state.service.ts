import { Injectable } from '@angular/core';

import { tap, map, Observable } from 'rxjs';

import { AuthUserStore } from './auth-user.store';
import { AuthUserQuery } from './auth-user.query';
import { UserApiService } from '../../services';
import { IUser } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthUserStateService {
  constructor(
    private readonly store: AuthUserStore,
    private readonly query: AuthUserQuery,
    private readonly userApiService: UserApiService,
  ) {}

  load(): Observable<IUser> {
    return this.userApiService.getUser()
      .pipe(tap(user => this.store.set([user])))
  }

  select(): Observable<IUser> {
    return this.query.selectAll()
      .pipe(map(users => users[0]));
  }

  update(id: string, user: IUser): void {
    this.store.update(id, user)
  }

  reset(): void {
    this.store.reset();
  }
}
