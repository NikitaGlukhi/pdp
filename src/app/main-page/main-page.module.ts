import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreComponentsModule } from '../core/components';
import { SetUnderlineDirective } from '../core/directives';
import { HighlightedPostsPipe } from '../core/pipes';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PostDetailsComponent, MyProfileComponent } from './components';
import { AddPostComponent } from './modals';

@NgModule({
  declarations: [
    MainPageComponent,
    PostDetailsComponent,
    SetUnderlineDirective,
    HighlightedPostsPipe,
    AddPostComponent,
    MyProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
    CoreComponentsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbAlertModule,
  ],
})
export class MainPageModule {}
