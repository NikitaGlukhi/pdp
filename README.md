## Mixins
I created a mixin for post functional in `src/app/core/mixins/post-mixin.ts` and use it in `src/app/main-page/components/post-details/post-details.component.ts` and `src/app/main-page/main-page.component.ts`

### 1. Describe what benefit do mixins bring
#### Using mixins allows us to inherit a class from multiple classes.

### 2. Name a few cases that could ideal for a usage of mixin
#### I think, it could be `UserDetailsComponent` but I need to think about functional what could be moved to mixin.

## Function curry
Curried filter posts function implemented in `src/app/main-page/main-page.component.ts` (method `filterPosts()`) where you need to pass text param to filter posts by users and post body 

### 1. What insights did you gain into the concept of currying, and how did it influence your approach to designing the filtering system in Angular?
#### I can use them as universal function (if use first layer of curried function) and then add other different parameters depend on situation

## Notification service
 - You can find notification service in `src/app/core/services/alerts.service.ts`. Here I have `alerts$` parameter which is BehaviourSubject and for which changes I subscribe in AlertsComponent. Also, here implemented few methods for adding/closing alerts 
 - Alerts Component implemented in `src/app/core/components/alerts/alerts-outlet.component.ts`. In html file I subscribe for `alerts$` data changes to display alerts
 - For auto closing alerts I created ClockService (`src/app/core/services/clock.service.ts`) which check triggers every seconds by subscribing for its changes I filter outdated alerts

Note: please note, that right now alerts not display on pages where I added them because subscription not working properly (investigating this)

## Flux (state management)
Added state management for posts data. For this I used Akita store

 - Implemented PostsStore in `src/app/core/states/posts/posts.store.ts` file
 - Implemented PostsState in `src/app/core/states/posts/posts.state.ts` file
 - Implemented query(action) in `src/app/core/states/posts/posts.query.ts` file
 - Also, added PostsStateService (`src/app/core/states/posts/posts-state.service.ts`) to call query(action) methods

### 1. Reflect on how Flux architecture improved the management of real-time notifications in your social media clone. How did the unidirectional data flow contribute to a more predictable state management process?
#### State management allows us not call a big data stack from DB every time when we navigate between pages for example. We can load data once and that this data will be stored in store on our FE and we can update it only whe data was updated in DB

### 2. Describe any challenges you encountered while implementing Flux for real-time notifications. How did the Flux architecture help address these challenges, and what solutions did you implement?
#### My main challenge was how to fix call method to get updated data from DB after data was updated. It was not related to flux functional. It was related to backend. Finally, I fixed it by set `res.json()` as a result for POST/PUT/DELETE endpoints

## AOT & JIT compilation
AOT compilation
Advantages:
 - Runs before code execution
 - No needles for additional RAM

JIT compilation
Advantages:
 - caching results of compilation. As a result, code execution speed in JIT can be very fast
 - JIT uses different levels of optimization to find the best one for our code
 - Code can be optimized while it's running

Disadvantages:
 - Optimization and de-optimization cycles are expensive
 - JIT introduces the memory overhead associated with storing optimized code

As for me, the JIT compilation will be better for development mode, while AOT compilation I'd prefer to use for production

