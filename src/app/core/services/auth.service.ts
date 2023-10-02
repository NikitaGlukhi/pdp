import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { UserApiService } from './user-api.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly userApiService: UserApiService,
    private readonly lsService: StorageService,
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
