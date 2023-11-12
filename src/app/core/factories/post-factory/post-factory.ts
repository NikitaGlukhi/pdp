import { ImagePost } from './image-post';
import { TextPost } from './text-post';

export class PostFactory {
  createPost(isImgPost = false): ImagePost | TextPost {
    if (isImgPost) {
      return new ImagePost();
    }

    return new TextPost();
  }
}
