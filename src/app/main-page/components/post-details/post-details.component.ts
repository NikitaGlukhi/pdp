import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { tap, switchMap, Observable, Subscription, BehaviorSubject } from 'rxjs';

import { LikesApiService, PostsApiService, StorageService, AlertsService } from '../../../core/services';
import { ILike } from '../../../core/models';
import { FeaturedPost } from '../../../core/types/featured-post';
import { FeaturedImagePost } from '../../../core/types';
import { postMixin } from '../../../core/mixins';
import { PostCommon } from '../../../core/components';

@Component({
  selector: 'post-details',
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent extends postMixin(PostCommon) implements OnInit, OnDestroy {
  post?: FeaturedPost;
  likes$ = new BehaviorSubject<ILike[]>([]);
  editModeEnabled = false;
  postText?: string;
  userId?: string;

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly storageService: StorageService,
    private readonly http: HttpClient,
  ) {
    super(new LikesApiService(http), new PostsApiService(http), new AlertsService())
  }

  ngOnInit(): void {
    this.userId = this.storageService.getData('auth-token') as string;
    const postSub = this.getPostById().subscribe();
    this.subscriptions.add(postSub);

    const likesSub = this.getLikes(this.getPostId).subscribe();
    this.subscriptions.add(likesSub);
  }

  likedByUser = (): boolean => {
    const like = this.post?.likes.find(like => like.likedBy === this.userId);

    return !!like;
  }

  savePost(): void {
    const updatedPostData = { ...this.post, text: this.postText };

    this.postsApiService.updatePost(this.getPostId, JSON.stringify(updatedPostData))
      .pipe(
        tap(() => this.editModeEnabled = false),
        switchMap(() => this.getPostById()),
      ).subscribe();
  }

  isImagePost(post: FeaturedPost): boolean {
    return !!(<FeaturedImagePost>post).imgUrl;
  }

  getImgUrl(post: FeaturedPost): string {
    return (<FeaturedImagePost>post).imgUrl;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getLikes(getPostId: () => string): Observable<ILike[]> {
    return this.likesApiService.getLikesByPostId(getPostId())
      .pipe(tap(likes => setTimeout(() => this.likes$.next(likes), 0)));
  }

  private getPostById(): Observable<FeaturedPost> {
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
