import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap, switchMap, Observable, Subscription, BehaviorSubject } from 'rxjs';

import { LikesApiService, PostsApiService, LocalStorageService } from '../../../core/services';
import { IAddLike, ILike, IPost, IUser } from '../../../core/models';

@Component({
  selector: 'post-details',
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post?: IPost;
  likes$ = new BehaviorSubject<ILike[]>([]);
  editModeEnabled = false;
  postText = '';
  userId?: string;

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsApiService: PostsApiService,
    private readonly likesApiService: LikesApiService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.userId = this.localStorageService.getData('auth-token') as string;
    const postSub = this.getPostById().subscribe();
    this.subscriptions.add(postSub);

    const likesSub = this.getLikes(this.getPostId).subscribe();
    this.subscriptions.add(likesSub);
  }

  likedByUser = (): boolean => {
    const like = this.post?.likes.find(like => like.likedBy === this.userId);

    return !!like;
  }

  addLike(): void {
    const data: IAddLike = {
      postId: this.getPostId(),
      userId: this.userId as string,
    }

    this.likesApiService.addNewLike(JSON.stringify(data))
      .pipe(switchMap(() => this.getLikes(this.getPostId))).subscribe();
  }

  removeLike(): void {
    const like = this.post?.likes.find(like => like.likedBy === this.userId);

    if (like) {
      this.likesApiService.removeLike(like.id).subscribe();
    }
  }

  savePost(): void {
    const updatedPostData = { ...this.post, text: this.postText };

    this.postsApiService.updatePost(this.getPostId, JSON.stringify(updatedPostData))
      .pipe(
        tap(() => this.editModeEnabled = false),
        switchMap(() => this.getPostById()),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getLikes(getPostId: () => string): Observable<ILike[]> {
    return this.likesApiService.getLikesByPostId(getPostId())
      .pipe(tap(likes => setTimeout(() => this.likes$.next(likes), 0)));
  }

  private getPostById(): Observable<IPost> {
    return this.postsApiService.getPostById(this.getPostId)
      .pipe(tap(post => {
        setTimeout(() => {
          this.post = post;
          this.postText = post.text;
        }, 0)
      }));
  }

  private getPostId = (): string => this.activatedRoute.snapshot.paramMap.get('id') || 'id';
}
