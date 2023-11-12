import { v4 } from 'uuid';
import { FeaturedImagePost } from '../../types/featured-image-post';

export class ImagePost {
  create(
    imgUrl: string,
    userId: string,
    isFeatured: boolean,
    text?: string,
  ): Omit<FeaturedImagePost, 'likes'> {
    return {
      id: v4(),
      imgUrl,
      userId,
      text,
      isFeatured,
      likesCount: 0,
    };
  }
}
