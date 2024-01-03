import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, Observable } from 'rxjs';

import { ScopeService, StorageService, UserApiService } from '../services';

export const isAdmin: CanActivateFn = (): boolean | Observable<boolean> => {
  const token = inject(StorageService).getData('auth-token');

  if (!token) {
    inject(Router).navigateByUrl('/');
    return false;
  }

  return inject(UserApiService).getUserById(token)
    .pipe(map(user => inject(ScopeService).isAdmin(user)));
}
