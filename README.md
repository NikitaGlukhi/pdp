## Create a dynamic user profile management system allowing users to view, edit, and update their personal information. This system should integrate seamlessly with the existing social media application, enhancing user interactivity and personalization.
In `src/app/user-profile` I added Edit User Data form, which allows user to edit his/her name, nickname, email password phone number.
Validation was provided for this form, for email control regexp pattern was created (`src/app/core/constants/email-regexp.ts`).

Also, user can hide all his/her posts by selecting `Allow users to see my posts` option in text.

Storage of user data was changes. I reworked it to Akita store (all users' data - `src/app/core/states/users`, current authenticated user - `src/app/core/states/auth-user`).
So, after user's data was updated in form, the changes will take effect on all pages.

Unfortunately I couldn't implement changing user photo functional, because couldn't find the best solution that will avoid me to create specific cloud storage for images.
But I implemented image selector control component - `src/app/core/controls/image-control` for this, that will be used in app when I find best solution for those pet project how to store images in DB.

### How did you structure your Angular form for profile management? Discuss the choice between reactive and template-driven forms and why one was more suitable for this task.
I used angular reactive forms, because it's easier to manipulate and validate input data. Also, via `valueChanges` event (not used in this project) I can create a specific logic on specific field's value.

### What validation techniques did you implement and how do they contribute to a better user experience?
For validation, I used `Validators.required` method and for email field I used `Validators.pattern` where I used email regexp (`src/app/core/constants/email-regexp.ts`).

### How did you ensure that the user profile changes were propagated throughout the application? Discuss any challenges you faced and how you overcame them.
I implemented saving user data via Akita store all users' data - `src/app/core/states/users`, current authenticated user - `src/app/core/states/auth-user`).

## Improve your app by enhancing post and comment interactivity using Observables and RxJS, with a focus on understanding mergeMap vs merge and avoiding common anti-patterns.
Storage of user data was changes. I reworked it to Akita store (all users' data - `src/app/core/states/users`, current authenticated user - `src/app/core/states/auth-user`).
So, after user's data was updated in form, the changes will take effect on all pages.

To make app updating in realtime backend was reworked. Now, all POST/PUT/DELETE method returns updated data, that updates/adds/removes to Akita store. So, now, for example, likes counter works good in realtime.

### Observable Strategies: Reflect on your choice between using mergeMap vs merge for real-time updates and dynamic comment loading. Why was one more suitable for the tasks at hand?
`mergeMap` is more suitable for real-time apps cause it doesn't unsubscribe form previous event.

### Performance Considerations: How did you ensure that the implementation of real-time features was efficient and did not degrade app performance? Discuss any specific challenges you faced and the strategies used to overcome them.
I updated implementation of backend endpoints (POST/PUT/DELETE) that now return updated data to the FE part where its updates in Akita store.

## Integrate Angular Elements to create reusable custom widgets that can be utilized across the social media clone, enhancing the application's modularity and the developer's understanding of web components.
Custom likes widget implemented in specific repository - `https://github.com/NikitaGlukhi/likes-widget`. I used its build chunks here - `src/app/core/custom-elements/likes`
and integrated scripts in `index.html` and tried to use custom widget in `src/app/main-page/components/post-details` but unfortunately it doesn't render.

### Angular Elements Integration: Discuss the process and challenges you faced integrating Angular Elements into the existing social media clone. How did Angular Elements enhance or complicate the architecture?
Angular elements allows to create custom reusable components, that we can be used in different environments (not only JS environment). The only complicate case for me is integrating custom element to application.

### Custom Widget Design: Reflect on the design and development of your custom widgets. How did Angular Elements facilitate the creation of these reusable components?
With Angular Elements I have single component with specific design that I can use in many other apps and I need, for example, change styles or functional once and that I just need to update usage of element in my app like updating library version.
