## Levels of abstraction
You can find User, Post and Likes components in `src/app/core/components` an how they used in app in `src/app/user-profile` and `src/app/main-page` folders

## Composition
UserProfile component - `src/app/user-profile/user-profile.component.ts`

## Prototypes in JS / by reference vs copying
An example of using prototype and demonstrating difference between using data as reference or value is in `src/app/core/components/user/user.component.ts`

## Interfaces
All interfaces you can find in `src/app/core/models` 

## Classes and Inheritance
An example of inheritance you can find in `src/app/core/models` where BaseEntity is a parent class for ILike, IPost and IUser

## Introduction to Web Storages
You can find storage service with using local/session storages and cookies in `src/app/core/services/storage.service.ts`

## Cookies, Local/Session storages
LocalStorage is a single storage for one domain in single browser, that's why it's the best way to store data for user preferences 
Session storage is the same as LocalStorage, but it will be able only for single tab and will be empty after tab was closed. This is the good way to implement different scenarios whe user works in parallel tabs
Cookies is a good way to remember user activity in application and apply specific users's data in new browser 

## Bind/Call/Apply
TYhe example of using - `src/app/core/components/post/post.component.ts`
