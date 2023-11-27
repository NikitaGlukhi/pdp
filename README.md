## @Liked decorator
An implementation of @Liked decorator you can find in `src/app/core/decorators/liked.decorator.ts` and an example of usage of this decorator is in `src/app/core/components/post/post.component.ts`.

## Decorators Fundamentals
### 1. Explain the purpose of the @Liked decorator in your implementation.
In my app @Liked decorator modify `addLike()` method, which increase likes count for specific post, that adds some reactive behaviour to the application.
### 2. How does the @Liked decorator modify the behavior of the like method?
It increases post's `likesCount` property during executing `addLike()` method in `src/app/core/components/post/post.component.ts` file.

## Angular Architecture
### 1. How do decorators fit into the overall architecture of an Angular application?
Decorators are core part of Angular architecture. As example: `@Input` and `@Output` decorator with of which data is exchanged between parent and child components.
### 2. In what situations might decorators be particularly useful in the context of an Angular application?
- Data exchange between parent and child components (`@Input`/`@Output`)
- Component declaration (`@Component`)
- NgModule declaration (`@NgModule`)
- To mark class for Dependency Injection (`@Injectable`)
- Listen DOM events (`@HostListener`)
- In TypeORM to describe DB table columns

## Use Cases of Decorators in Angular:
### 1. Provide at least two other use cases where custom decorators could be beneficial in an Angular project.
Decorators is a good solution when you need to provide same solution in different part of application. Another way, for example, for caching.
### 2. Discuss the advantages of using decorators for these use cases.
You can simplify way to add difficult logic in different part of application. For caching you can only add a decorator to class/method without needless to create logic for store data in cache.

## Reflection on Implementation
### 1. Reflect on the challenges you faced while implementing the @Liked decorator. How did you overcome them?
### 2. Discuss any design decisions you made and why you made them.
First of all I investigated types of decorators, that could be provided (class/method/property decorators). The next challenge was, that I always got
an `Unable to resolve signature of class decorator when called as an expression`. Solved it by reworking `addLike()` from arrow to regular function. And the last one was how to increase post's likes count.
Solved it by passing post object as method param and that got access to it via `...args` in decorator.

## Extending the Challenge:
### 1. How might you extend the functionality of the @Liked decorator to handle additional features, such as preventing a user from liking a post multiple times?
By passing `userId` param in method `addLike` and check if user already liked this post.
### 2. Discuss potential improvements to the user interface related to the display of likes.
I'd like to add additional decorator for `removeLike` method.
