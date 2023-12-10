import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, Observable } from 'rxjs';

import { StorageService, UserApiService } from '../services';
import { PostsStateService } from '../states';

export const isAuthenticated: CanActivateFn = (): boolean | Observable<boolean> => {
  const token = inject(StorageService).getData('auth-token');
  const postsStateService = inject(PostsStateService);

  if (!token) {
    inject(Router).navigateByUrl('/auth');
    return false;
  }

  return inject(UserApiService).getUserById(token)
    .pipe(
      map(user => {
        if (user) {
          postsStateService.load().subscribe();
          return true;
        }

        inject(Router).navigateByUrl('/auth');
        return false;
      })
    )
}
