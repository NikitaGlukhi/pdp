## E2E
Started learning how to implement e2e tests and Cypress. You can find it in `cypress` folder

## Push trigger
Added pre-push trigger using `husky`

## Types
1. It's easier to manage data types because no need to constantly keep inheritance in mind and you don't need to afraid, that changes in one of the type could break everything.
2. Without using inheritance we can mix different types, which can be applied universally without fear of problems that may arise when changing anything in the inheritance hierarchy.

## Pipes
Created Pure Pipe - `src/app/core/pipes/capitalize-first-letter.pipe.ts` and Impure Pipe - `src/app/core/pipes/highlighted-posts.pipe.ts`
Also added 'Refresh button' in `src/app/main-page/main-page.component.html`

1. Pure pipes are watching for changes of value, that passes to them. In Impure pipes changes detected when reference value was changed.
2. Pure pipes detect changes only when input value was changed. It's good for app optimization. Also it avoid us to create a lot of code dublication whan we want to make some action with primitive value in different parts of application
3. 

## Git flow - revert pushed commit
1. Revert to previous commit
2. Push new commit with reverted changes
