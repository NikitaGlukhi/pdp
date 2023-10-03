import { Input, AfterViewInit, ViewChild, Component } from '@angular/core';

import { IPost } from '../../models';
import { LikesComponent } from '../likes/likes.component';

function totalPostLikes(checkDate: number, username: string): void {
  // @ts-ignore
  prompt(`This post was liked ${this.likes?.length} time(-s). Checked ${new Date(checkDate).toUTCString()} by ${username}.`);
}

@Component({
  selector: 'post-core',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @ViewChild('likes', { read: LikesComponent }) likesComponent?: LikesComponent;

  @Input() post?: IPost;
  @Input() currentUserId?: string;
  @Input() userName?: string;

  countTotalLikes(): void {
    totalPostLikes.apply(this.likesComponent, [Date.now(), this.userName || 'N/A']); // will get expected result
    totalPostLikes.call(this.likesComponent, Date.now(), this.userName || 'N/A'); // will get expected result
    totalPostLikes(Date.now(), this.userName || 'N/A'); // will get an error
  }

  likedByUser = (): boolean => {
    const like = this.post?.likes.find(like => like.likedBy === this.currentUserId);

    return !!like;
  }
}
