import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { PostDetailsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: ':id',
    component: PostDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
