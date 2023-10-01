import { Input, Output, Component, EventEmitter } from '@angular/core';
import { ILike } from '../../models';

@Component({
  selector: 'likes-core',
  templateUrl: './likes.component.html',
})
export class LikesComponent {
  @Input() likes?: ILike[];
  @Input() likedByUser: () => boolean;

  @Output() onLikedOrDisliked = new EventEmitter<boolean>();

  likeOrDislike(): void {
    this.onLikedOrDisliked.emit(!this.likedByUser);
  }
}
