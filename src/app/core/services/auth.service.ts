import { Injectable } from '@angular/core';

import { map, interval, startWith, Observable } from 'rxjs';

import { UserApiService } from './user-api.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenRefreshCheckIntervalInMilliseconds = 10000;
  readonly tokenRefreshCheckInterval = interval(this.tokenRefreshCheckIntervalInMilliseconds)
    .pipe(startWith(-1));

  constructor(
    private readonly userApiService: UserApiService,
    private readonly lsService: StorageService,
  ) {}

  login(data: { login: string; password: string }): Observable<void> {
    const { login, password } = data;

    return this.userApiService.getUserByAuthData(login, password)
      .pipe(map(() => { return; }));
  }

  logout(): void {
    this.lsService.remove(['auth-token']);
  }
}
