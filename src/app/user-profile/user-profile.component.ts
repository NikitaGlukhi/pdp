import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

import {filter, tap} from 'rxjs';

import {UserComponent} from '../core/components';
import {AlertsService, StorageService, UserApiService} from '../core/services';
import {IUser} from '../core/models';
import {unsubscribeMixin} from '../core/mixins';
import {AuthUserStateService, UsersStateService} from '../core/states';
import {AlertTypes} from '../core/enums';
import {emailRegexp} from '../core/constants';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent extends unsubscribeMixin() implements OnInit, OnDestroy {
  @ViewChildren('userData', { read: UserComponent }) userDataComponent?: UserComponent;

  user?: IUser;
  userId?: string;
  currentUserId?: string;
  isCurrentUser = false;
  form?: UntypedFormGroup;
  showForm = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService,
    private readonly authUserStateService: AuthUserStateService,
    private readonly usersStateService: UsersStateService,
    private readonly formBuilder: FormBuilder,
    private readonly alertsService: AlertsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') as string;

    const userSub = this.authUserStateService.select()
      .pipe(
        filter(user => !!user),
        tap(user => {
          this.user = user;
          this.currentUserId = user?.id;
          this.isCurrentUser = this.currentUserId === this.userId;

          this.initForm();
        })
      ).subscribe();
    this.subscriptions.add(userSub);
  }

  followUser(userId: string): void {
    console.log(userId);
  }

  getUserName(): string {
    return this.user?.nickname || 'N/A';
  }

  updateUserData(): void {
    if (this.form) {
      const value = this.form.value;
      const password = value.password ? value.password : this.user?.password;

      this.userApiService.updateUserById(this.currentUserId as string, { ...value, password })
        .pipe(
          tap(user => {
            this.alertsService.addAlert({
              time: Date.now(),
              heading: 'Success: ',
              body: 'updated user',
              type: AlertTypes.success,
            });

            this.authUserStateService.update(user.id, user);
            this.usersStateService.update(user.id, user);
            this.showForm = false;
          }),
        ).subscribe();
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fullName: [this.user?.fullName, [Validators.required]],
      nickname: [this.user?.nickname, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.pattern(emailRegexp)]],
      phoneNumber: [this.user?.phoneNumber, [Validators.required]],
      password: [null],
      photo: [this.user?.photo],
    });
  }
}
