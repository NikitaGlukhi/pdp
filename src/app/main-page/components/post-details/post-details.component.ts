import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {tap, switchMap, Observable, BehaviorSubject, catchError, of} from 'rxjs';

import {AlertsService, DataService, StorageService} from '../../../core/services';
import {IAddLike, ILike} from '../../../core/models';
import { FeaturedPost } from '../../../core/types/featured-post';
import { FeaturedImagePost } from '../../../core/types';
import { BASE_HTTP_PATH } from '../../../core/constants';
import { AlertTypes } from '../../../core/enums';
import { unsubscribeMixin } from '../../../core/mixins';

@Component({
  selector: 'post-details',
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent extends unsubscribeMixin() implements OnInit {
  post?: FeaturedPost;
  likes$ = new BehaviorSubject<ILike[]>([]);
  editModeEnabled = false;
  postText?: string;
  userId?: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly storageService: StorageService,
    private readonly postsApiService: DataService<FeaturedPost>,
    private readonly likesApiService: DataService<ILike>,
    private readonly alertsService: AlertsService,
  ) {
    super();
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

    this.postsApiService.update(`${BASE_HTTP_PATH}/posts/${this.post?.id}`, JSON.stringify(updatedPostData))
      .pipe(
        tap(() => this.editModeEnabled = false),
        switchMap(() => this.getPostById()),
      ).subscribe();
  }

  addLike(postId: string, userId: string): Observable<void> {
    const data: IAddLike = { postId, userId }

    return this.likesApiService.add(`${BASE_HTTP_PATH}/likes`, JSON.stringify(data))
      .pipe(
        tap(() => {
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
      );
  }

  removeLike(post: FeaturedPost, userId: string): Observable<void | null> {
    const like = post.likes.find(like => like.likedBy === userId);

    if (like) {
      return this.likesApiService.delete(like.id)
        .pipe(
          tap(() => {
            this.alertsService.addAlert({
              heading: 'Success: ',
              body: 'you disliked this post',
              time: Date.now(),
              type: AlertTypes.success,
            })
          }),
          catchError(err => {
            this.alertsService.addAlert({
              heading: 'Failed: ',
              body: 'an error occurred during disliking post',
              time: Date.now(),
              type: AlertTypes.danger,
            });

            return of(err);
          })
        );
    }

    return of(null);
  }

  isImagePost(post: FeaturedPost): boolean {
    return !!(<FeaturedImagePost>post).imgUrl;
  }

  getImgUrl(post: FeaturedPost): string {
    return (<FeaturedImagePost>post).imgUrl;
  }

  private getLikes(getPostId: () => string): Observable<ILike[]> {
    return this.likesApiService.getManyById(`${BASE_HTTP_PATH}/likes/post/${getPostId()}`)
      .pipe(tap(likes => setTimeout(() => this.likes$.next(likes), 0)));
  }

  private getPostById(): Observable<FeaturedPost> {
    return this.postsApiService.getById(`${BASE_HTTP_PATH}/posts/${this.getPostId()}`)
      .pipe(tap(post => {
        setTimeout(() => {
          this.post = post;
          this.postText = post.text;
        }, 0)
      }));
  }

  private getPostId = (): string => this.activatedRoute.snapshot.paramMap.get('id') || 'id';
}
