import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SetUnderlineDirective } from '../core/directives';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PostDetailsComponent } from './components';

@NgModule({
  declarations: [MainPageComponent, PostDetailsComponent, SetUnderlineDirective],
  imports: [
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
  ],
})
export class MainPageModule {}
