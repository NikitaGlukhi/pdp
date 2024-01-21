import { OnInit, Component, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

import { tap } from 'rxjs';

import { UserComponent } from '../core/components';
import { UserApiService, StorageService } from '../core/services';
import { IUser } from '../core/models';
import { unsubscribeMixin } from '../core/mixins';
import {AuthUserStateService} from '../core/states';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent extends unsubscribeMixin() implements OnInit {
  @ViewChildren('userData', { read: UserComponent }) userDataComponent?: UserComponent;

  user?: IUser;
  userId?: string;
  currentUserId?: string;
  isCurrentUser = false;
  form?: UntypedFormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService,
    private readonly authUserStateService: AuthUserStateService,
    private readonly formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') as string;

    const userSub = this.authUserStateService.select()
      .pipe(tap(user => {
        this.user = user;
        this.currentUserId = this.user.id;
        this.isCurrentUser = this.currentUserId === this.userId;
      })).subscribe();
    this.subscriptions.add(userSub);

    this.form = this.formBuilder.group({
      fullName: [this.user?.fullName],
      nickname: [this.user?.nickname],
      email: [this.user?.email],
      phoneNumber: [this.user?.phoneNumber],
      password: ['', [Validators.required]],
      photo: [this.user?.photo],
    });
  }

  followUser(userId: string): void {
    console.log(userId);
  }

  getUserName(): string {
    return this.user?.nickname || 'N/A';
  }
}
