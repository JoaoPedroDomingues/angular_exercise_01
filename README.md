# JoaoDomingues

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# General decision making...

Some aspects that can be highlighted in this implementation:
 - Creating a **Type** out of request responses is generally a good practice - there's some tools that make this automatically off of Swagger files, for instance;
 - Abstraction of the services when applicable;
 - Using a standard Angular file structure, with **Shared** for stuff like *Services*, *Directives* and *Utils*, **Feature** for the regular feature-focused components and **Core** (currently unused) for components unrelated to a given feature and used in multiple places;
 - I usually prefer to have a full separation of Styling, Template and Component - even for really small templates and stylings, I still use a separate file rather than inline. It's also good to keep consistency throughout the projects;
 - Per-feature sub-modules, to prevent clumping the main `app.module.ts` and to only export what's necessary;
 - I'm a terrible designer :)

If I were to expand this project, some things I would be focusing on would be:
 - **Extend the architecture to the standard Angular one** - Introducing *core*, where I would insert components that do not belong to the *features* and are common to the whole application (e.g.: HeaderComponent, FooterComponent, ... .. .);
 - **Standardize styling** - Currently each component has it's own styling being applied independently. Ideally, we want a more centralized stylization that can be inherited from. For example, if there isn't strict in-house design, we could resort to Component Libraries. Alternatively, for larger projects with multiple clients where the in-house design is a must, we can resort to a Shared Component Library, for instance; 
 - **Extrapolate string literals from somewhere else** - For the sake of supporting both localization and remove the responsibility from the development team for managing text content, removing hard-coded text from components and making use of a service like, for instance, Lokalise or Sanity;
 - **Introduction of caching requests** - I usually focus on how the product works to make my decisions on what to cache and how;
 - **Expansion of the state management services** - For more complex applications, state management can become quite complex and it would be a good idea to separate this logic which, currently, is tightly coupled with the `userPosts.service.ts` - the decision to have them in the same class for now is that in the context of this assignment, the http request and the state update are, indeed, fully coupled;
 - **Be more diligent with providing all services from the root** - While the current implementation lazy-loads services, which is good, not all services should be accessible everywhere in the application;
 - **Supporting multiple viewport sizes**;
 - **General accessibility practices**.

### A note on the usage of NgRX as state manager

While I didn't use **NgRX** in this assignment, I decided to leave here what would the store associated with my `UserPosts` look like, in it's own `userPosts.state.ts`:

```typescript
import { createAction, createReducer, on, props } from "@ngrx/store";
import { UserPost } from "../models";

export interface UserPostsState {
    userPosts: UserPost[]
}

export const initialUserPostsState: UserPostsState = {
    userPosts: []
};

// Actions

export const setUserPosts = createAction('[UserPosts] Set User Posts', props<UserPostsState>());
// we can set multiple actions to be called for different use cases

// Reducers

export const userPostsReducer = createReducer(
    initialUserPostsState,
    on(setUserPosts, (state, { userPosts }) => ({ ...state, userPosts }))
    // we can then define multiple on's that deal with data differently for different use cases
);

// Selectors

export const selectUserPosts = (state: UserPostsState) => state.userPosts;
// we can export multiple selectors, which removes the responsibility to filter/treat data from who is using this data
```

How I would update the state:

```typescript
@Injectable({ providedIn: 'root' })
export class UserPostsService {
    constructor(private httpPostsService: HttpPostsService, private store: Store) { }

    getPosts(): Observable<UserPost[]> {
        return this.httpPostsService.get().pipe(
            tap((userPosts) => {
                this.store.dispatch(setUserPosts({ userPosts })); // Using the action setUserPosts to send the received response
            })
        );
    }
}
```

While I don't have a lot of experience using **NgRX**, I have used its React equivalent (Redux).

The snippets above served as my own exercise to draw conclusions on how Redux's concepts are similar to NgRX's, using NgRX's official documentation as my reference.

### Some problems faced

The initial intention was to setup this project using Jest, but there were some problems setting them up in a timely manner - I decided to go with the vanilla setup for the sake of simplicity and being able to focus on other things within the timeframe I wanted to hit.

I did provide a sample `*.spec.ts` file as an example of what my test philosophy would be.

My intentions on using Jest would be to make use of:
 - Experience using it;
 - Built-in mocking capabilities, making unit testing easier;
 - Parallel test execution, to make the dev-ops team happy :) 
 - Code coverage.

# Additional Info

To run the application, run the following commands:

- `npm install -g pnpm`;
- `pnpm install`;
- `pnpm start`

Two files were created in order to configure the usage of TailwindCSS on separate CSS files when using VSCode (it works without them but you get a warning):
 - `.vscode/tailwind.json`;
 - `.vscode/settings.json`.

These contain, respectively:

```json
{
    "version": 1.1,
    "atDirectives": [
      {
        "name": "@tailwind",
        "description": "Use the `@tailwind` directive to insert Tailwind's `base`, `components`, `utilities` and `screens` styles into your CSS.",
        "references": [
          {
            "name": "Tailwind Documentation",
            "url": "https://tailwindcss.com/docs/functions-and-directives#tailwind"
          }
        ]
      },
      {
        "name": "@apply",
        "description": "Use the `@apply` directive to inline any existing utility classes into your own custom CSS. This is useful when you find a common utility pattern in your HTML that you’d like to extract to a new component.",
        "references": [
          {
            "name": "Tailwind Documentation",
            "url": "https://tailwindcss.com/docs/functions-and-directives#apply"
          }
        ]
      },
      {
        "name": "@responsive",
        "description": "You can generate responsive variants of your own classes by wrapping their definitions in the `@responsive` directive:\n```css\n@responsive {\n  .alert {\n    background-color: #E53E3E;\n  }\n}\n```\n",
        "references": [
          {
            "name": "Tailwind Documentation",
            "url": "https://tailwindcss.com/docs/functions-and-directives#responsive"
          }
        ]
      },
      {
        "name": "@screen",
        "description": "The `@screen` directive allows you to create media queries that reference your breakpoints by **name** instead of duplicating their values in your own CSS:\n```css\n@screen sm {\n  /* ... */\n}\n```\n…gets transformed into this:\n```css\n@media (min-width: 640px) {\n  /* ... */\n}\n```\n",
        "references": [
          {
            "name": "Tailwind Documentation",
            "url": "https://tailwindcss.com/docs/functions-and-directives#screen"
          }
        ]
      },
      {
        "name": "@variants",
        "description": "Generate `hover`, `focus`, `active` and other **variants** of your own utilities by wrapping their definitions in the `@variants` directive:\n```css\n@variants hover, focus {\n   .btn-brand {\n    background-color: #3182CE;\n  }\n}\n```\n",
        "references": [
          {
            "name": "Tailwind Documentation",
            "url": "https://tailwindcss.com/docs/functions-and-directives#variants"
          }
        ]
      }
    ]
  }
```

```json
{
    "css.customData": [
        ".vscode/tailwind.json"
    ]
}
```