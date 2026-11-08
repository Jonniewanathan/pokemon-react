# Pokémon browser (React)

A small app built to compare React and Angular on the same set of features. The Angular version is at
[pokemon-angular](https://github.com/YOUR-USERNAME/pokemon-angular), with the same functionality and
layout and a different theme colour.

Data and sprites come from [PokeAPI](https://pokeapi.co). This is an unofficial fan project and is not
affiliated with or endorsed by Nintendo or The Pokémon Company.

## Features
- Browse Pokémon fetched from the API, with loading and error states
- Debounced search
- Favourites that persist across reloads
- Detail page for each Pokémon (routing with a URL parameter, plus a not found page)
- A note form for favourites, with validation and error messages shown once a field is touched
- Unit and component tests

## Tech stack
- React with TypeScript, built with Vite
- React Router v7
- Zustand (with the `persist` middleware) for shared state
- Vitest and React Testing Library
- ESLint
- Plain CSS with custom properties for theming

## Getting started
Requires Node 20.19+ or 22.12+.

```bash
npm install
npm run dev
```
Then open http://localhost:5173.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm test` | Run the tests in watch mode |
| `npx vitest run` | Run the tests once |
| `npm run lint` | Lint the code |

## Project structure
```
src/
  components/   Reusable UI (FavouriteButton, NoteForm)
  hooks/        Custom hooks (usePokemonList, usePokemonDetail, useDebounce)
  pages/        Routed screens (ListPage, DetailPage, FavouritesPage)
  stores/       Zustand store for favourites and notes
  utils/        Plain functions (validateNote)
  types.ts      Shared TypeScript types
  App.tsx       Navigation and routes
```

## What it demonstrates
- Fetching in effects with cleanup, using `AbortController` and `response.ok` checks
- Custom hooks for data fetching and debouncing
- Controlled inputs and derived validation state
- A global store outside React, with selectors and persistence
- Routing with route params
- Testing hooks, a store, components and a page with a mocked `fetch`

## React vs Angular, in this project
| | React (this repo) | Angular |
|---|---|---|
| Shared state | Zustand store | Signal-based service |
| Data fetching | Custom hooks with `fetch` | `HttpClient` in a service |
| Debounce | `useDebounce` hook | RxJS `debounceTime` |
| Forms | Controlled inputs, manual validation | Reactive Forms |
| Routing | React Router | Angular Router |
| Tests | Vitest and React Testing Library | Vitest and `TestBed` |