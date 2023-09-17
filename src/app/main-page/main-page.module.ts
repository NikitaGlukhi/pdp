import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PostDetailsComponent } from './components';

@NgModule({
  declarations: [MainPageComponent, PostDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
  ],
})
export class MainPageModule {}
