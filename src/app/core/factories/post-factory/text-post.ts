import { v4 } from 'uuid';
import { FeaturedTextPost } from '../../types/featured-text-post';

export class TextPost {
  create(
    text: string,
    userId: string,
    isFeatured: boolean,
  ): Omit<FeaturedTextPost, 'likes'> {
    return {
      id: v4(),
      text,
      userId,
      isFeatured,
      likesCount: 0,
    };
  }
}
