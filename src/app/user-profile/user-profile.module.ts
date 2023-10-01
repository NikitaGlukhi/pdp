import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CoreComponentsModule } from '../core/components';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CoreComponentsModule,
  ],
})
export class UserProfileModule {}
