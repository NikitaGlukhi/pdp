import { OnInit, OnDestroy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap, Subscription, Observable } from 'rxjs';

import { UserApiService, StorageService } from '../core/services';
import { IUser } from '../core/models';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user?: IUser;
  isCurrentUser?: boolean;
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId') as string;
    const currentUserId = this.storageService.getData('auth-token') as string;

    this.isCurrentUser = userId === currentUserId;

    const userSub = this.userApiService.getUserById(userId)
      .pipe(tap(user => this.user = user)).subscribe();

    this.subscriptions.add(userSub);
  }

  getUserName(): string {
    return this.user?.nickname || 'N/A';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
