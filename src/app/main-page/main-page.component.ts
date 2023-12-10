import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription, switchMap, concatMap, tap, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUser } from '../core/models';
import { SortPostOptions } from '../core/enums';
import { PostFactory } from '../core/factories';
import { FeaturedPost } from '../core/types/featured-post';
import { postMixin } from '../core/mixins';
import { PostCommon } from '../core/components';
import { AuthService, LikesApiService, PostsApiService, StorageService, UserApiService } from '../core/services';
import { AddPostComponent } from './modals';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent extends postMixin(PostCommon) implements OnInit, OnDestroy {
  posts?: FeaturedPost[];
  currentUser?: IUser;
  searchData?: string;
  sortOptions = SortPostOptions;
  selectedOption = SortPostOptions.all;

  private users?: IUser[];
  private allPosts?: FeaturedPost[];
  private factory = new PostFactory();

  /* Initialize worker */
  private worker = new Worker(new URL('../core/workers/search-posts.worker', import.meta.url));
  private readonly subscriptions = new Subscription();

  constructor(
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
    );
  }

  ngOnInit(): void {
    const token = this.lsService.getData('auth-token');

    /* Listening worker and sorting posts here */
    this.worker.onmessage = ({ data }) => {
      this.posts = [];
      const users = this.users?.filter(user => user.nickname.includes(data));

      if (users && users.length > 0) {
        for (const user of users) {
          const userPosts = this.allPosts?.filter(post => post.userId === user.id);
          if (userPosts) {
            this.posts.push(...userPosts);

            this.cdr.detectChanges();
          }
        }
      }

      const postsByText = this.allPosts?.filter(post => post.text?.includes(data));
      if (postsByText && postsByText.length > 0) {
        this.posts.push(...postsByText);

        this.cdr.detectChanges();
      }
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
        concatMap(() => this.loadAllPosts()),
      ).subscribe();
  }

  searchPosts(searchString: string): void {
    /* Trigger the worker */
    this.worker.postMessage(searchString);
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

  ngOnDestroy(): void {
    this.worker.terminate();
    this.subscriptions.unsubscribe();
  }

  private loadAllPosts(): Observable<FeaturedPost[]> {
    return this.postsApiService.getAll()
      .pipe(
        tap(posts => {
          this.allPosts = posts;
          this.posts = posts;

          this.cdr.detectChanges();
        })
      )
  }
}
