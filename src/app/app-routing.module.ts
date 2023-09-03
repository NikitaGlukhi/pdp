import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { isAuthenticated } from './core/guards';

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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
