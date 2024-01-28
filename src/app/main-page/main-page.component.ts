import {ChangeDetectorRef, Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {catchError, concatMap, Observable, of, switchMap, tap} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IAddLike, ILike, IUser} from '../core/models';
import {AlertTypes, SortPostOptions} from '../core/enums';
import {PostFactory} from '../core/factories';
import {FeaturedPost} from '../core/types/featured-post';
import {AuthUserStateService, PostsStateService, UsersStateService} from '../core/states';
import {AlertsService, AuthService, DataService, StorageService, UserApiService} from '../core/services';
import {AddPostComponent} from './modals';
import {BASE_HTTP_PATH} from '../core/constants';
import {unsubscribeMixin} from '../core/mixins';
import {add} from 'husky';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [AuthService],
})
export class MainPageComponent extends unsubscribeMixin() implements OnInit, OnDestroy {
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

  constructor(
    readonly postsStateService: PostsStateService,
    private readonly lsService: StorageService,
    private readonly userApiService: UserApiService,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly modalService: NgbModal,
    private readonly alertsService: AlertsService,
    private readonly postsApiService: DataService<FeaturedPost>,
    private readonly likesApiService: DataService<ILike>,
    private readonly sanitizer: DomSanitizer,
    private readonly usersStateService: UsersStateService,
    private readonly authUserStateService: AuthUserStateService,
  ) {
    super();
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

    const authUserSub = this.authUserStateService.select()
      .pipe(tap(user => {
        this.currentUser = user;
        this.cdr.detectChanges();
      })).subscribe();
    this.subscriptions.add(authUserSub);

    const usersSub = this.usersStateService.selectAll()
      .pipe(
        tap(users => {
          this.users = users;
          this.cdr.detectChanges();
        })
      ).subscribe();
    this.subscriptions.add(usersSub);

    this.subscriptions.add(this.userApiService.refreshToken().subscribe());
  }

  addPost(): void {
    const modalRef = this.modalService.open(AddPostComponent, { backdrop: 'static' });
    const instance = modalRef.componentInstance as AddPostComponent;

    instance.response
      .pipe(
        switchMap(({ text, isFeatured }) => {
          const newPost = this.factory.createPost();
          const userId = this.currentUser?.id || '';

          return this.postsApiService.add(
            `${BASE_HTTP_PATH}/posts`,
            JSON.stringify(newPost.create(text, userId, isFeatured))
          );
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

  addLike(postId: string, userId: string): void {
    const data: IAddLike = { postId, userId };

    this.likesApiService.add(`${BASE_HTTP_PATH}/likes`, JSON.stringify(data))
      .pipe(
        tap(addedLike => {
          let post = this.postsStateService.getById(addedLike.postId);

          if (post) {
            const likes = [...post.likes, addedLike];
            const updatedPost = { ...post, likes, likesCount: likes.length };
            this.postsStateService.update(updatedPost.id, updatedPost);
          }

          this.alertsService.addAlert({
            heading: 'Success: ',
            body: 'you liked this post',
            time: Date.now(),
            type: AlertTypes.success,
          })
        }),
        catchError(err => {
          this.alertsService.addAlert({
            heading: 'Failed: ',
            body: 'an error occurred during liking post',
            time: Date.now(),
            type: AlertTypes.danger,
          });

          return of(err);
        })
      ).subscribe();
  }

  removeLike(post: FeaturedPost, userId: string): void {
    const like = post.likes.find(like => like.likedBy === userId);

    if (like) {
      this.likesApiService.delete(`${BASE_HTTP_PATH}/likes/post/${like.id}`)
        .pipe(
          tap(removedLike => {
            const post = this.postsStateService.getById(removedLike.postId);

            if (post) {
              const updatedPostsLikes = post.likes.filter(like => like.id !== removedLike.id);
              const updatedPost = { ...post, likes: updatedPostsLikes, likesCount: updatedPostsLikes.length };
              this.postsStateService.update(updatedPost.id, updatedPost);
            }

            this.alertsService.addAlert({
              heading: 'Success: ',
              body: 'you disliked this post',
              time: Date.now(),
              type: AlertTypes.success,
            })
          }),
          catchError(err => {
            console.log(err);

            this.alertsService.addAlert({
              heading: 'Failed: ',
              body: 'an error occurred during disliking post',
              time: Date.now(),
              type: AlertTypes.danger,
            });

            return of(err);
          })
        ).subscribe();
    }
  }

  markPostFeatured(data: { postId: string, isFeatured: boolean }, posts: FeaturedPost[]): void {
    const {postId, isFeatured} = data;
    let post = posts.find(post => post.id === postId);

    if (post) {
      post = {...post, isFeatured};
      this.postsApiService.update(
        `${BASE_HTTP_PATH}/posts/${data.postId}`,
        JSON.stringify(post),
      )
        .pipe(
          tap(updatedPost => {
            this.postsStateService.update(updatedPost.id, updatedPost);

            this.alertsService.addAlert({
              heading: 'Success: ',
              body: 'post added to featured posts',
              time: Date.now(),
              type: AlertTypes.success,
            })
          }),
        ).subscribe();
    }
  }

  searchPosts(): void {
    /* Trigger the worker */
    let safeSearchData = this.sanitizer.sanitize(SecurityContext.HTML, this.searchData || '');
    safeSearchData = this.sanitizer.sanitize(SecurityContext.URL, safeSearchData || '');
    safeSearchData = this.sanitizer.sanitize(SecurityContext.SCRIPT, safeSearchData || '');

    this.worker.postMessage(safeSearchData);
  }

  getUserNicknameById = (id?: string): string => {
    const user = this.usersStateService.getById(id || '');

    return user?.nickname || 'N/A';
  }

  getAllPosts(): void {
    this.loadAllPosts().subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  checkPostToShow(userId: string): boolean {
    const user = this.usersStateService.getById(userId);

    return user?.allowToShowPosts || true;
  }

  override ngOnDestroy(): void {
    this.worker.terminate();
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
