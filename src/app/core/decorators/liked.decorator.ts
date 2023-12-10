import { FeaturedPost } from '../types/featured-post';

export function Liked() {
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(post: FeaturedPost) => void>) => {
    const originalValue = descriptor.value;

    descriptor.value = function (...args) {
      const post = JSON.parse(JSON.stringify(args[0]));
      const newLikesCount = post.likesCount as number + 1;

      post.likesCount = newLikesCount;
      return originalValue?.apply(this, [post]);
    }

    return descriptor;
  };
}
