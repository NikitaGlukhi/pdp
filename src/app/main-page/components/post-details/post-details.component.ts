import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap, switchMap, Observable, Subscription, BehaviorSubject } from 'rxjs';

import { LikesApiService, PostsApiService, LocalStorageService } from '../../../core/services';
import { IAddLike, ILike, IPost } from '../../../core/models';

@Component({
  selector: 'post-details',
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post?: IPost;
  likes$ = new BehaviorSubject<ILike[]>([]);
  editModeEnabled = false;
  postText = '';

  private postId = '';
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsApiService: PostsApiService,
    private readonly likesApiService: LikesApiService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const routeSub = this.activatedRoute.params
      .pipe(
        tap(params => {
          const { id } = params;
          this.postId = id;
        }),
        switchMap(() => this.getPostById(this.postId)),
        switchMap(() => this.getLikes(this.postId)),
      ).subscribe();

    this.subscriptions.add(routeSub);
  }

  addLike(): void {
    const userId = this.localStorageService.getData('auth-token') as string;

    const data: IAddLike = {
      postId: this.postId,
      userId,
    }

    this.likesApiService.addNewLike(JSON.stringify(data))
      .pipe(switchMap(() => this.getLikes(this.postId))).subscribe();
  }

  savePost(): void {
    const updatedPostData = { ...this.post, text: this.postText };

    this.postsApiService.updatePost(this.postId, JSON.stringify(updatedPostData))
      .pipe(
        switchMap(() => this.getPostById(this.postId)),
        tap(() => this.editModeEnabled = false),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getLikes(postId: string): Observable<ILike[]> {
    return this.likesApiService.getLikesByPostId(postId)
      .pipe(tap(likes => this.likes$.next(likes)))
  }

  private getPostById(id: string): Observable<IPost> {
    return this.postsApiService.getPostById(id)
      .pipe(tap(post => {
        this.post = post;
        this.postText = post.text;
      }));
  }
}
