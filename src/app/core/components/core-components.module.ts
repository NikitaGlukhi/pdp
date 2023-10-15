import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LikesComponent } from './likes/likes.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';
import { CapitalizeFirstLetterPipe } from '../pipes/capitalize-first-letter.pipe';

@NgModule({
  declarations: [ LikesComponent, PostComponent, UserComponent, CapitalizeFirstLetterPipe ],
  imports: [ CommonModule, RouterModule ],
  exports: [ LikesComponent, PostComponent, UserComponent ],
})
export class CoreComponentsModule {}
