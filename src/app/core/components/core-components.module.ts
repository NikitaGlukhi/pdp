import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LikesComponent } from './likes/likes.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ LikesComponent, PostComponent, UserComponent ],
  imports: [ CommonModule, RouterModule ],
  exports: [ LikesComponent, PostComponent, UserComponent ],
})
export class CoreComponentsModule {}
