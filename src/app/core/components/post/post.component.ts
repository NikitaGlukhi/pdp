import { Input, Component, } from '@angular/core';

import { IPost } from '../../models';

@Component({
  selector: 'post-core',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post?: IPost;
  @Input() currentUserId?: string;
  @Input() getUserName: (id?: string) => string;

  likedByUser = (): boolean => {
    const like = this.post?.likes.find(like => like.likedBy === this.currentUserId);

    return !!like;
  }
}
