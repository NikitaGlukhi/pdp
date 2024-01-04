import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, Observable } from 'rxjs';

import { UserApiService } from './user-api.service';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userApiService: UserApiService,
    private readonly lsService: StorageService,
    private readonly router: Router,
  ) {}

  login(data: { login: string; password: string }): Observable<void> {
    const { login, password } = data;

    return this.userApiService.getUserByAuthData(login, password)
      .pipe(map(() => { return; }));
  }

  logout(): void {
    this.lsService.remove(['auth-token']);
    this.router.navigateByUrl('/auth');
  }
}
