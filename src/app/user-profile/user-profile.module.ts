import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreComponentsModule } from '../core/components';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileRoutingModule,
    CoreComponentsModule,
  ],
})
export class UserProfileModule {}
