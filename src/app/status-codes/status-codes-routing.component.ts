import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusCodesComponent } from './status-codes.component';

const routes: Routes = [{
  path: '',
  component: StatusCodesComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusCodesRoutingComponent {}
