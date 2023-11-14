## Design patterns

In application implemented Factory Method pattern (`src/app/core/factories/post-factory/post-factory.ts`) that used in `src/app/main-page/main-page.component.ts` in `addPost()` method to add new posts.

#### 1. What challenges did you encounter while implementing the design pattern? How did you overcome them?
During implementing Factory Method pattern I encountered the problem of how best to implement this in a component. First of all I tried to add it via providers, but then decided to create new instance of factory on component initializing.
#### 2. How did the design pattern influence the maintainability and scalability of your project? Did it simplify or complicate certain aspects of your code?
Added design patter added ability to implement adding post functional in different parts of application without writing the same code.
#### 3. What additional design patterns could potentially benefit your project, and why?
Probably, I'd like to add Repository Layer pattern, for example, on FE part to avoid directly call API services form components.
#### 4. What resources or tutorials were most helpful in understanding and implementing the design pattern?
The best resource was - https://www.patterns.dev/vanilla/factory-pattern/

## Change detection mechanism

In `src/app/main-page/main-page.component.ts` implemented `onPush` change detection strategy because there is a lot of different logic in thi component.

#### 1. What are the key concepts you learned about Angular's change detection mechanism?
 - Zone - signal mechanism that Angular use to detect app's state changes. It checks changes for all browser events, HTTP - requests, setTimeout/setInterval etc.
#### 2.  In which components or sections of your social media clone project did you apply change detection strategies, and why did you choose those areas?
In MainPageComponent, because it has a lot of different logic.
#### 3. How did tracking and logging changes in your application help you identify areas that needed optimization?
It could help detect components, where we don't need change view on every DOM changes, that will allow us implement manually change detection, that will make app's optimization better.
#### 4. Reflect on the performance improvements you observed after implementing change detection strategies. Were the changes significant, and how did they affect user experience?
The changes wasn't so significant cause my application is very simple. But I think, that on real project correct use of change detection could improve app speed, because unnecessary time will not be used for unnecessary additional checks.

## TypeScript namespaces, modules and closure hoisting
For example, all types in `src/app/core/types` are Typescript modules.
An example on using hoisting you can find in `src/app/main-page/main-page.component.ts` where `addLikeValue()` and `addLikeReference()` methods called before their implementation
An example of using closure you can find in `backend/posts.js` in `postConsoleMessage()`.

#### 1. What are TypeScript namespaces, and when is it appropriate to use them in your project?
Namespaces are logical grouping of different functionality. The can includes classes, interfaces, parameters, functions, etc. Nowadays it's unnecessary to use them in big applications, because frameworks like Angular are module-oriented.
#### 2. How do TypeScript modules differ from namespaces, and what are the advantages of using modules in Angular development?
Starting with ECMAScript 2015, modules are native part of the Typescript. Using using export/import keywords. It's better for code reuse and stronger isolation.
#### 3. What is closure hoisting, and why is it important to understand this concept when working with JavaScript or TypeScript?
Hoisting is ability of TS/JS to call functions/get variables values before their implementation/declaration, because during code compiling all functions/variables put to the start of compiled file.
Closure is ability that allows child function get data from scope of parent function even after parent function was completed.
#### 4. How did implementing namespaces or modules in your social media clone project impact code organization and structure?
Implementing modules makes my code clearer, avoid me to create reusable data and allows me to put specific interface/type to specific called file, which name will be informative and let other developer know what will he/she get if he/she will import this module.

## TypeScript type guards

An example of using type guards you can find in `src/app/core/components/post/post.component.ts` where I use `in` type guard  and custom type guard.

#### 1. What are TypeScript type guards, and why are they important in maintaining type safety in your code?
Type guards allows us to avoid to get type errors during our code compilations and running. They allow to check data with multiple types and creates specific scenarios related to the each type.
#### 2. How did you identify the use cases in your social media clone project where type guards were necessary, and what challenges did you face in these scenarios?
In `src/app/core/components/post/post.component.ts` I decided to add check for `imgUrl` to check if post is FeaturedImagePost or get `imgUrl` value for image post.
#### 3. What custom type guards did you create, and how do they ensure that the data in your project conforms to the expected data types?
In `src/app/core/components/post/post.component.ts` for `isImagePost()` I used custom guard to check if post is FeaturedImagePost.
#### 4. How did type guards help in preventing or handling type mismatches, and what impact did this have on the reliability of your code?
Type guard allows us avoid get typeErrors during code compilation, when we can call non-existent param/method in response.
#### 5. In what ways do you plan to continue using type guards in your social media clone project and other future Angular development work?
In the future I'm planning to add more type guards in places where could be passing data, that has multiple types.

## RxJS mergeMap, concatMap, and switchMap operators

An example of using concatMap and switchMap operators you can find in `src/app/main-page/main-page.component.ts` in `removeLike()` and `addPost()` methods.

#### 1. What are the key differences between mergeMap, concatMap, and switchMap, and when should each of these operators be used?
- mergeMap subscribes to new emit and still listen previous and execute both of them in random order (which will finished first)
- concatMap subscribes to new emit and still listen previous and execute both of them in their initial queue (even if first emin will take a lot of time)
- switchMap subscribes to new emit and unsubscribe from previous emit

#### 2. How did you identify the asynchronous scenarios in your social media clone project where these operators were suitable, and what challenges did you face in these scenarios?
For `addPost` I was need to reload all posts after new post was added. For `removeLike` I was need to reload data after like was removed.

#### 3. Provide examples of how you used mergeMap, concatMap, and switchMap in your project. What were the specific use cases for each operator?
In `addPost` I unsubscribe from modal's `response` event and subscribe for adding post event (`switchMap`), than I'm additionally subscribing for load all posts emit and firstly wait for adding new post and then load all posts (`concatMap`).

#### 4. How did using these operators improve the reactivity and efficiency of your application, and what were the outcomes in terms of user experience?
In `addPost` after adding new post it should immediately display after adding new post. (Now not working because each response from  BE occurs error)

#### 5. How has this experience with RxJS operators influenced your approach to handling asynchronous operations in Angular projects in the future?
I started better understand mergeMap ans concatMap operators and will better understand where I'll need to use them in future.

