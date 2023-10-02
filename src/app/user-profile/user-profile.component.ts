import { OnInit, OnDestroy, Component, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap, Subscription } from 'rxjs';

import { UserComponent } from '../core/components';
import { UserApiService, StorageService } from '../core/services';
import { IUser } from '../core/models';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChildren('userData', { read: UserComponent }) userDataComponent?: UserComponent;

  user?: IUser;
  isCurrentUser?: boolean;
  userId?: string;
  currentUserId?: string;
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') as string;
    this.currentUserId = this.storageService.getData('auth-token') as string;

    const userSub = this.userApiService.getUserById(this.userId)
      .pipe(tap(user => this.user = user)).subscribe();

    this.subscriptions.add(userSub);
  }

  followUser(userId: string): void {
    console.log(userId);
  }

  getUserName(): string {
    return this.user?.nickname || 'N/A';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
