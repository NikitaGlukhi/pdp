import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, Observable } from 'rxjs';

import { StorageService, UserApiService } from '../services';

export const isAuthenticated: CanActivateFn = (): boolean | Observable<boolean> => {
  const token = inject(StorageService).getData('auth-token');
  if (!token) {
    inject(Router).navigateByUrl('/auth');
    return false;
  }

  return inject(UserApiService).getUserById(token)
    .pipe(
      map(user => {
        if (user) {
          return true;
        }

        inject(Router).navigateByUrl('/auth');
        return false;
      })
    )
}
