# Pokémon browser (React)

Learning project for a technical interview (React vs Angular comparison).
It is the React half of a side-by-side comparison with an Angular app that has the same
features (Angular app: `C:\dev\angular-pokemon`). Both apps should look the same and differ
only by theme colours (React: cyan on dark, Angular: red on light) and by how each
framework does the work.

## How to help
- Do not write feature code for me. Explain concepts, point me to the right hook or API,
  review code I've written, and explain errors. Only write code if I explicitly ask.
- Keep answers short. When something differs from Angular, say how.
- I am an experienced Angular developer new to React, so link ideas to Angular where it helps.

## Stack
- React with TypeScript, built with Vite, linted with ESLint
- React Router v7 (`react-router`) for routing
- Zustand (with the `persist` middleware) for shared state
- Plain CSS in `src/index.css`, with a theme block of CSS custom properties at the top
- Data from PokeAPI: `https://pokeapi.co/api/v2/pokemon`
- Node 22 with npm 11 (Windows, PowerShell, WebStorm)

## Commands
- `npm run dev` runs the app at `http://localhost:5173`
- `npm run build` creates the production build
- `npm run lint` runs ESLint

## Structure
src/
components/   reusable UI (FavouriteButton, NoteForm)
hooks/        custom hooks (usePokemonList, usePokemonDetail, useDebounce)
pages/        routed screens (ListPage, DetailPage, FavouritesPage)
stores/       Zustand stores (favouritesStore)
utils/        plain functions (validateNote)
types.ts      shared TypeScript types
App.tsx       nav and routes

## Conventions
- Function components and hooks only. Custom hooks start with `use`.
- Hooks are called at the top level, before any early return.
- State updates are immutable (new arrays and objects, never mutate).
- Effects that fetch or set timers return a cleanup function. Fetches use `AbortController`.
- Check `response.ok` after `fetch`, since it does not reject on 404 or 500.
- Values that can be calculated from existing state are calculated during render,
  not stored in state or set in an effect.
- Controlled inputs for forms. Errors are derived, and shown once the field is touched.
- Zustand selectors pick the smallest slice (a primitive or existing reference),
  and never build a new array or object inside a selector.
- Types are declared in `types.ts` and imported with `import type`.
- No semicolons in prose.