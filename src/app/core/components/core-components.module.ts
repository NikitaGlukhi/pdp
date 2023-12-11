import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { LikesComponent } from './likes/likes.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
import { AlertsOutletComponent } from './alerts/alerts-outlet.component';
import { CapitalizeFirstLetterPipe } from '../pipes';

@NgModule({
  declarations: [ LikesComponent, PostComponent, UserComponent, CapitalizeFirstLetterPipe, AlertsOutletComponent ],
  imports: [
    CommonModule,
    RouterModule,
    NgbAlertModule,
  ],
  exports: [ LikesComponent, PostComponent, UserComponent, AlertsOutletComponent, NgbAlertModule ],
})
export class CoreComponentsModule {}
