import { FeaturedPost } from '../types/featured-post';

export function Liked<T>() {
  return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    console.log(222222, propertyKey, descriptor);
  };
}
