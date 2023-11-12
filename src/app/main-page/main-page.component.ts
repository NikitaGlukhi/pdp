import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import { IAddLike, ILike, IUser } from '../core/models';
import { SortPostOptions } from '../core/enums';
import { PostFactory } from '../core/factories';
import { FeaturedPost } from '../core/types/featured-post';
import { AuthService, LikesApiService, PostsApiService, StorageService, UserApiService } from '../core/services';
import {AddPostComponent} from './modals';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
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
    private readonly postsApiService: PostsApiService,
    private readonly authService: AuthService,
    private readonly likesApiService: LikesApiService,
    private readonly cdr: ChangeDetectorRef,
    private readonly modalService: NgbModal,
  ) {}

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
        })
      ).subscribe();
  }

  addLike(postId: string): void {
    if (this.posts && this.posts.length > 0) {
      const post = this.posts.find(post => post.id === postId);

      if (post) {
        this.addLikeValue(post.likesCount);
        // this.addLikeReference(post.likes, postId);
      }
    }

    const data: IAddLike = {
      postId,
      userId: this.currentUser?.id as string,
    }

    this.likesApiService.addNewLike(JSON.stringify(data)).subscribe();
  }

  addLikeValue(likesCount: number): void {
    likesCount += 1;

    console.log(likesCount);
  }

  addLikeReference(likes: ILike[], postId: string): void {
    likes.push({
      id: uuidv4(),
      postId,
      likedBy: this.currentUser?.id as string,
    });
  }

  removeLike(post: FeaturedPost): void {
    const like = post.likes.find(like => like.likedBy === this.currentUser?.id);

    if (like) {
      this.likesApiService.removeLike(like.id).subscribe();
    }

    this.cdr.detectChanges();
  }

  searchPosts(searchString: string): void {
    /* Trigger the worker */
    this.worker.postMessage(searchString);
  }

  getUserNicknameById = (id?: string): string => {
    const user = this.users?.find(user => user.id === id);

    return user?.nickname || 'N/A';
  }

  markPostFeatured(data: { postId: string, isFeatured: boolean }): void {
    const post = this.posts?.find(post => post.id === data.postId);

    if (post) {
      post.isFeatured = data.isFeatured;
      this.postsApiService.updatePostByStringId(data.postId, JSON.stringify(post)).subscribe();
    }

    this.cdr.detectChanges();
  }

  getAllPosts(): void {
    this.postsApiService.getAll()
      .pipe(
        tap(posts => {
          this.allPosts = posts;
          this.posts = posts;

          this.cdr.detectChanges();
        })
      ).subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.worker.terminate();
    this.subscriptions.unsubscribe();
  }
}
