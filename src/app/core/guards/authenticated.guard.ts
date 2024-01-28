import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, Observable } from 'rxjs';

import { StorageService, UserApiService } from '../services';
import { PostsStateService } from '../states';
import { UsersStateService } from '../states/users/users-state.service';
import { AuthUserStateService } from '../states/auth-user/auth-user-state.service';

export const isAuthenticated: CanActivateFn = (): boolean | Observable<boolean> => {
  const token = inject(StorageService).getData('auth-token');
  const postsStateService = inject(PostsStateService);
  const usersStateService = inject(UsersStateService);
  const authUserStateService = inject(AuthUserStateService);

  if (!token) {
    inject(Router).navigateByUrl('/auth');
    return false;
  }

  return inject(UserApiService).getUser()
    .pipe(
      map(user => {
        if (user) {
          postsStateService.load().subscribe();
          usersStateService.load().subscribe();
          authUserStateService.load().subscribe();
          return true;
        }

        inject(Router).navigateByUrl('/auth');
        return false;
      })
    )
}
