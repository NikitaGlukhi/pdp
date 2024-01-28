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
import { AuthUserStateService, PostsStateService } from '../../../core/states';

@Component({
  selector: 'post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['../../../core/custom-elements/likes/styles.css'],
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
    private readonly authUserStateService: AuthUserStateService,
    private readonly postsStateService: PostsStateService,
  ) {
    super();
  }

  ngOnInit(): void {
    const authUserSub = this.authUserStateService.select()
      .pipe(tap(user => this.userId = user?.id))
      .subscribe();
    this.subscriptions.add(authUserSub);

    const postSub = this.getPostById().subscribe();
    this.subscriptions.add(postSub);
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

  addLike(postId: string, userId: string): void {
    const data: IAddLike = { postId, userId }

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

  private getPostById(): Observable<FeaturedPost | undefined> {
    return this.postsStateService.selectById(this.getPostId())
      .pipe(
        tap(post => {
          if (post) {
            this.post = post;
            this.postText = post.text;
          }
      }));
  }

  private getPostId = (): string => this.activatedRoute.snapshot.paramMap.get('id') || 'id';
}
