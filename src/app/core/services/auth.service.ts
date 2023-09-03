import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { UserApiService } from './user-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly userApiService: UserApiService,
    private readonly lsService: LocalStorageService,
  ) {}

  login(data: { login: string; password: string }): Observable<void> {
    const { login, password } = data;

    return this.userApiService.getUserByAuthData(login, password).pipe(map(user => {
      return;
    }));
  }

  logout(): void {
    this.lsService.remove(['auth-token']);
  }
}
