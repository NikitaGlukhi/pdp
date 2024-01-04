## TypeScript Genetics.
I created generic DataService in `src/app/core/services/data.service.ts` and replace all usage of LikesApiService and PostsApiService with it.

#### How did using generics in the DataService improve the scalability and maintainability of the application?
Now I have single service for working with likes/posts data and they have the same functional to get/add/update/delete data, that will simplify working with getting data for those entities in the future.

#### What were the main challenges you faced when integrating the generic service with existing features like posts, likes, and featured posts?
The main challenge for me was refactoring calling, parsing methods and endpoints on BE to make functional identical for DataService.

## Memory leaks
You can find unsubscribe mixing here - `src/app/core/mixins/unsubscribe-mixin.ts` and its usage in
`src/app/main-page/main-page.component.ts`, `src/app/main-page/components/post-details/post-details.component.ts` and `src/app/user-profile/user-profile.component.ts`

#### Discuss the challenges you faced in implementing this mixin and making it generic for use across different components.
The main challenge for me was adding specific functional to he `ngOnDestroy` in `src/app/main-page/main-page.component.ts`. Resolved it by adding `override` before `ngOnDestroy`

#### How did you determine which components were responsible for the leaks?
I found components, that has subscriptions and events (in my case - active worker in `src/app/main-page/main-page.component.ts`) 

## Dependency injection
You can find LoggingService in `src/app/core/services/logging.service.ts` and its usage by finding `inject(LoggingService)`.
I reworked `AuthService` and made it not provided in root. I added it via providers in `src/app/auth/components/login/login.component.ts` and `src/app/main-page/main-page.component.ts`.

#### How did Dependency Injection help in managing dependencies across different components and services in the application?
It allows to avoid creating duplicating code and allows to use single functional in different components/other services.

## JWT Auth
JWT auth implemented in `backend/users.js`. I used `jsinwebtoken` for it. Also, here is an endpoint to refresh auth token (`/refreshToken`)
Interceptor, that adds JWT to HTTP-request is here - `src/app/core/interceptors/jwt-interceptor.ts`.

#### Discuss the security considerations you took into account when storing and transmitting JWTs
With JWT it difficult to get critical user data, because you need to decode JWT token, but you can't do it without secret key.

## Angular Security Features
Added Content Security Policy in the `src/app/app.component.ts`. Added sanitizer in the `src/app/main-page/main-page.component.ts` and `src/app/main-page/modals/add-post/add-post.component.ts`
Created role-based guard (`src/app/core/guards/admin-guard.ts`) that allows to visit Status Codes page only for admins.

#### Discuss the importance of sanitizing user input and output in the context of preventing XSS attacks
Sanitizing of user input is very important thing, cause it now allow to put dangerous links/scripts to the application.

#### Describe the process of implementing RBAC in the application. How did Angular’s features facilitate this implementation?
Angular allows to create RBAC via route guards. We can do it using simply way - via user role or using harder way - add specific scope to the route data and store necessary scope for each user in DB.
