# React RTK Query Cache Demo

A responsive React + JavaScript demo showing how Redux Toolkit Query (RTK Query) fetches API data, manages request states, and reuses cached responses.

## Features
- Fetches a list of posts and individual posts from JSONPlaceholder.
- Uses generated RTK Query hooks for data, loading, fetching, and error states.
- Shows cache status and the last successful fulfillment time.
- Demonstrates cache reuse by unmounting and remounting the posts list.
- Supports manual refetch and a retry action for failed requests.
- Includes a 404 demo using post ID `9999`.
- Responsive layout for desktop and mobile.

## Tech stack
- React and JavaScript
- Vite
- Redux Toolkit / RTK Query
- React-Redux
- JSONPlaceholder public API

## Run locally
Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
  app/store.js          Redux store and RTK Query middleware
  services/postsApi.js  createApi, endpoints, generated hooks
  App.jsx               Cache demo UI
  App.css               Existing component styles (if used)
  index.css             Responsive app styling
  main.jsx              React entry point and Redux Provider
```

## How it works
1. `createApi` defines endpoints and creates the API reducer, middleware, and hooks.
2. `fetchBaseQuery` sends HTTP requests using the Fetch API.
3. The Redux store registers `postsApi.reducer` and `postsApi.middleware`.
4. `useGetPostsQuery()` and `useGetPostQuery(id)` subscribe components to endpoint cache entries.
5. RTK Query keys cache entries by endpoint and serialized arguments. Matching subscriptions can reuse existing cached results.
6. `keepUnusedDataFor: 60` in `src/services/postsApi.js` keeps an unused cache entry for 60 seconds after its last subscriber unmounts.
7. `refetch()` explicitly requests fresh data. `isLoading` indicates an initial load; `isFetching` indicates a request is in progress.

## Manual verification
1. Run `npm run dev` and open DevTools â†’ Network â†’ Fetch/XHR.
2. Clear the request list.
3. Click **Unmount list**, then **Mount list** promptly. The cached list should return without a new list request while its cache entry is retained.
4. Click **Refresh data**. A new list request should appear.
5. Select Post 1, Post 2, then Post 1. The first post may be served from its cache entry.
6. Select **404 demo** to see the error state; use Retry to repeat the request.
7. Unmount the list and wait more than 60 seconds before mounting again to observe cache expiry.

## Documentation
- RTK Query overview: https://redux-toolkit.js.org/rtk-query/overview
- Cache behavior: https://redux-toolkit.js.org/rtk-query/usage/cache-behavior
- JSONPlaceholder: https://jsonplaceholder.typicode.com/
