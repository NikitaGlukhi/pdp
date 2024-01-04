import { Input, Output, ViewChild, Component, EventEmitter } from '@angular/core';

import { FeaturedPost } from '../../types/featured-post';
import { LikesComponent } from '../likes/likes.component';
import { FeaturedImagePost } from '../../types';
import { Liked } from '../../decorators';
import { LoggingService } from '../../services';

function totalPostLikes(checkDate: number, username: string): void {
  // @ts-ignore
  prompt(`This post was liked ${this.likes?.length} time(-s). Checked ${new Date(checkDate).toUTCString()} by ${username}.`);
}

@Component({
  selector: 'post-core',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [LoggingService]
})
export class PostComponent {
  @ViewChild('likes', { read: LikesComponent }) likesComponent?: LikesComponent;

  @Input() post?: FeaturedPost;
  @Input() currentUserId?: string;
  @Input() userName?: string;
  @Input() displayLikesCount = false;

  @Output() onLike = new EventEmitter<void>();
  @Output() onDislike = new EventEmitter<void>();
  @Output() onMarkedFeatured = new EventEmitter<{ postId: string, isFeatured: boolean }>();

  constructor(private readonly loggingService: LoggingService) {}

  countTotalLikes(): void {
    totalPostLikes.apply(this.likesComponent, [Date.now(), this.userName || 'N/A']); // will get expected result
    totalPostLikes.call(this.likesComponent, Date.now(), this.userName || 'N/A'); // will get expected result
    totalPostLikes(Date.now(), this.userName || 'N/A'); // will get an error
  }

  likedByUser = (): boolean => {
    const like = this.post?.likes.find(like => like.likedBy === this.currentUserId);

    return !!like;
  }

  markFeatured = (postId: string, isFeatured: boolean): void => this.onMarkedFeatured.emit({ postId, isFeatured });

  isImagePost(post: FeaturedPost): post is FeaturedImagePost {
    return (post as FeaturedImagePost).imgUrl !== undefined;
  }

  getImgUrl(post: FeaturedPost): string  {
    if ('imgUrl' in post) {
      return post.imgUrl;
    }

    return '';
  }

  @Liked()
  addLike(post: FeaturedPost): void {
    this.loggingService.markAction('Like');
    this.onLike.emit();
  }

  removeLike = (): void => {
    this.loggingService.markAction('Dislike');
    this.onDislike.emit();
  }
}
