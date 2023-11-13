## Design patterns

In application implemented Factory Method pattern (`src/app/core/factories/post-factory/post-factory.ts`) that used in `src/app/main-page/main-page.component.ts` in `addPost()` method to add new posts.

#### 1. What challenges did you encounter while implementing the design pattern? How did you overcome them?
During implementing Factory Method pattern I encountered the problem of how best to implement this in a component. First of all I tried to add it via providers, but then decided to create new instance of factory on component initializing.
#### 2. How did the design pattern influence the maintainability and scalability of your project? Did it simplify or complicate certain aspects of your code?
Added design patter added ability to implement adding post functional in different parts of application without writing the same code.
#### 3. What additional design patterns could potentially benefit your project, and why?
Probably, I'd like to add Repository Layer pattern, for example, on FE part to avoid directly call API services form components.
#### 4. 
