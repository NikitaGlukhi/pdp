import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { isAdmin, isAuthenticated } from './core/guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(module => module.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./main-page/main-page.module')
      .then(module => module.MainPageModule),
    canActivate: [isAuthenticated],
  },
  {
    path: 'profile/:userId',
    loadChildren: () => import('./user-profile/user-profile.module')
      .then(module => module.UserProfileModule),
    canActivate: [isAuthenticated]
  },
  {
    path: 'status-codes',
    loadChildren: () => import('./status-codes/status-codes.module')
      .then(module => module.StatusCodesModule),
    canActivate: [isAuthenticated, isAdmin],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
