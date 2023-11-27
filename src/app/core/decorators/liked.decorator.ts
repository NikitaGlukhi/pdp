import { FeaturedPost } from '../types/featured-post';

export function Liked() {
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(post: FeaturedPost) => void>) => {
    const originalValue = descriptor.value;

    descriptor.value = function (...args) {
      const post = args[0];
      post.likesCount += 1;
      return originalValue?.apply(this, [post]);
    }

    return descriptor;
  };
}
