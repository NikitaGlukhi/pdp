##  Integrate e2e tests with prepush
To pass e2e tests you should start FE (`npm run start`) and BE (`npm run backend:start`) parts

## Passing data by value/reference
In `src/app/main-page/main-page.component.ts` file added two methods - `addLikeValue()` and `addLikeReference()`, that add new likes by passing data by value/reference.
For this added primitive param to FeaturedPost type - `likesCount`.

1. By passing primitive values (like number) we're passing copy of value. So in this case the value of original parameter won't be changed. If we pass an object, we pass the link for this object.
So all change, that will be done with this link will be affected on original object.

## HTTP Status Codes
To get random status code created constant `src/app/core/constants/status-codes.ts`. Also created new component to get access 
to `httpbin.org` - `src/app/status-codes`. In application you can navigate to this page by `/status-codes` route.

1. Knowledge of different status code let developer to give the end user the most accurate information, for example, what went wrong with if error occurred, and will also simplify and speed up the fixing issues process.
2. Understanding of status codes let developer to give the end user the most accurate information, for example, what went wrong with if error occurred.
3. The most used status codes are - **200, 204, 304, 400, 404, 429, 500**.

## Handling HTTP Errors
In `src/app/status-codes/status-codes.component.ts` in `makeRequest()` method added handling error via `catchError` operator and added `retry` parameter.
Also, in `src/app/status-codes/status-codes.component.html` added alert, that shows data like this `{{ statusCode }}: {{ sttausText }}`.

1. So that the user has more information about what could potentially go wrong and can describe the problem as accurately as possible, which will make it easier to identify the cause of this problem.
2. User is always confident that if the application doesn't work correctly, he/she will receive all the necessary information, with which he/she will be able to correctly report the problem to support.
3. The best situations to use retry for failed requests - for 500 and 503 statuses.

## Introduction to Web Security
3 most common web-sites security vulnerabilities
1. SQL Injections
2. Cross Site Scripting (XSS)
3. Broken Authentication & Session Management

In `src/app/status-codes/status-codes.component.html` added `[innerHTML]` attribute with sanitized `text` parameter. Also created `src/app/status-codes/app-https.interceptor.ts`
interceptor, that will replace all `http://` urls by `https://` and will warn in console about `http://` request's url.

1. For protecting personal user data (especially when it comes to credit cards).
2. Developer better understands in which parts of the application he should pay more attention to the implementation of additional checks, etc.
3. For me it was Cross Site Scripting (XSS). Yes, I've used sanitizers before, but this was infrequent and after studying this vulnerability I would review all `[innerHTML]` attributes in the project I am working on nowю 
