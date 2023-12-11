import {of, catchError, tap, Observable} from 'rxjs';

import {AlertsService, LikesApiService, PostsApiService} from '../../services';
import {IAddLike} from '../../models';
import {FeaturedPost} from '../../types/featured-post';
import {AlertTypes} from '../../enums';

export class PostCommon {
  constructor(
    protected readonly likesApiService: LikesApiService,
    protected readonly postsApiService: PostsApiService,
    protected readonly alertsService: AlertsService,
  ) {}

  addLike(postId: string, userId: string): Observable<void | null> {
    const data: IAddLike = { postId, userId }

    return this.likesApiService.addNewLike(JSON.stringify(data))
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
      return this.likesApiService.removeLike(like.id)
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

  markPostFeatured(data: { postId: string, isFeatured: boolean }, posts: FeaturedPost[]): Observable<void | null> {
    const { postId, isFeatured } = data;
    let post = posts.find(post => post.id === postId);

    if (post) {
      post = { ...post, isFeatured};
      return this.postsApiService.updatePostByStringId(data.postId, JSON.stringify(post))
        .pipe(
          tap(() => this.alertsService.addAlert({
            heading: 'Success: ',
            body: 'post added to featured posts',
            time: Date.now(),
            type: AlertTypes.success,
          })),
        );
    }

    return of(null);
  }
}
