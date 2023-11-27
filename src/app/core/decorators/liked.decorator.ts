import { v4 as uuidv4 } from 'uuid';
import { FeaturedPost } from '../types/featured-post';

export function Liked() {
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(post: FeaturedPost, userId: string) => void>) => {
    const originalValue = descriptor.value;

    descriptor.value = function (...args) {
      const post = args[0];
      const userId = args[1]
      post.likesCount += 1;
      post.likes.push({
        id: uuidv4(),
        postId: post.id,
        likedBy: userId,
      });
      return originalValue?.apply(this, [post, userId]);
    }

    return descriptor;
  };
}
