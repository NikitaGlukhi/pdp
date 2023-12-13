import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { concatMap, Observable, Subscription, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUser } from '../core/models';
import { AlertTypes, SortPostOptions } from '../core/enums';
import { PostFactory } from '../core/factories';
import { FeaturedPost } from '../core/types/featured-post';
import { postMixin } from '../core/mixins';
import { PostCommon } from '../core/components';
import { PostsStateService } from '../core/states';
import {
  AlertsService,
  AuthService,
  LikesApiService,
  PostsApiService,
  StorageService,
  UserApiService
} from '../core/services';
import { AddPostComponent } from './modals';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent extends postMixin(PostCommon) implements OnInit, OnDestroy {
  posts?: FeaturedPost[];
  currentUser?: IUser;
  searchData?: string;
  filterByFeaturedFLag = false;
  sortOptions = SortPostOptions;
  selectedOption = SortPostOptions.all;

  private users?: IUser[];
  private allPosts?: FeaturedPost[];
  private factory = new PostFactory();

  /* Initialize worker */
  private worker = new Worker(new URL('../core/workers/search-posts.worker', import.meta.url));
  private readonly subscriptions = new Subscription();

  constructor(
    readonly postsStateService: PostsStateService,
    private readonly lsService: StorageService,
    private readonly userApiService: UserApiService,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly modalService: NgbModal,
    private readonly http: HttpClient,
  ) {
    super(
      new LikesApiService(http),
      new PostsApiService(http),
      new AlertsService(),
    );
  }

  ngOnInit(): void {
    const token = this.lsService.getData('auth-token');

    /* Listening worker and sorting posts here */
    this.worker.onmessage = ({ data }) => {
      const users = this.users?.filter(user => user.nickname.includes(data));

      if (this.allPosts && users) {
        this.posts = this.filterPosts()(data)(this.filterByFeaturedFLag);

        this.alertsService.addAlert({
          heading: 'Success: ',
          body: 'filtered',
          time: Date.now(),
          type: AlertTypes.success,
        })
      }

      this.cdr.detectChanges();
    }

    this.getAllPosts();

    const usersSub = this.userApiService.getAll()
      .pipe(
        tap(users => {
          this.users = users;
          this.currentUser = this.users.find(user => user.id === token);

          this.cdr.detectChanges();
        })
      ).subscribe();
    this.subscriptions.add(usersSub);
  }

  addPost(): void {
    const modalRef = this.modalService.open(AddPostComponent, { backdrop: 'static' });
    const instance = modalRef.componentInstance as AddPostComponent;

    instance.response
      .pipe(
        switchMap(({ text, isFeatured }) => {
          const newPost = this.factory.createPost();
          const userId = this.currentUser?.id || '';

          return this.postsApiService.addPost(newPost.create(text, userId, isFeatured));
        }),
        tap(() => this.alertsService.addAlert({
          heading: 'Success: ',
          body: 'post added',
          time: Date.now(),
          type: AlertTypes.success,
        })),
        concatMap(() => this.postsStateService.load()),
      ).subscribe();
  }

  searchPosts(): void {
    /* Trigger the worker */
    this.worker.postMessage(this.searchData);
  }

  getUserNicknameById = (id?: string): string => {
    const user = this.users?.find(user => user.id === id);

    return user?.nickname || 'N/A';
  }

  getAllPosts(): void {
    this.loadAllPosts().subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  reloadPosts(method: Observable<void | null>): void {
    method
      .pipe(switchMap(() => this.postsStateService.load()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.worker.terminate();
    this.subscriptions.unsubscribe();
  }

  private loadAllPosts(): Observable<FeaturedPost[]> {
    return this.postsStateService.selectAll()
      .pipe(
        tap(posts => {
          this.allPosts = posts;
          this.posts = posts;

          this.cdr.detectChanges();
        })
      )
  }

  private filterPosts(): (text: string) => (isFeatured: boolean) => FeaturedPost[] {
    const posts = this.allPosts as FeaturedPost[];
    const users = this.users as IUser[];

    return function (text: string) {
      return function (isFeatured: boolean) {
        const filteredByUserPosts = []

        for (const user of users) {
          const userPosts = posts.filter(post => post.userId === user.id);
          if (userPosts) {
            filteredByUserPosts.push(...userPosts);
          }
        }

        const filteredByTextPosts = filteredByUserPosts.filter(post => post.text && post.text.includes(text))

        if (isFeatured) {
          return filteredByTextPosts.filter(post => post.isFeatured);
        }

        return filteredByUserPosts;
      }
    }
  }
}
