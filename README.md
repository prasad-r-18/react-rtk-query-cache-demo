# React RTK Query Cache Demo

A React application demonstrating API fetching and caching using Redux Toolkit Query (RTK Query).

## Features

* Fetch posts from JSONPlaceholder.
* Cache API responses using RTK Query.
* Display loading and error states.
* Refetch data manually.
* Reuse cached data when switching between posts.
* Demonstrate API errors using an invalid post ID.

## Tech Stack

* React
* JavaScript
* Vite
* Redux Toolkit
* RTK Query
* React-Redux

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## How RTK Query Works

### 1. createApi

Defines the API service and its endpoints.

### 2. fetchBaseQuery

Provides a lightweight wrapper around the Fetch API.

### 3. Redux Store

Registers the API reducer and middleware.

### 4. Generated Hooks

`useGetPostsQuery` and `useGetPostQuery` fetch data and manage loading, error, and caching states.

### 5. Caching

RTK Query caches responses by endpoint and arguments. Unused data remains cached for 60 seconds after its final subscriber unmounts.

### 6. Testing the Cache

Hide and show the posts list, or switch between posts. Previously cached responses can be reused without another request while valid in the cache.

Click **Refresh posts** to force a refetch.

## API

JSONPlaceholder: https://jsonplaceholder.typicode.com/

## Official Documentation

* RTK Query: https://redux-toolkit.js.org/rtk-query/overview
* Redux Toolkit: https://redux-toolkit.js.org/
* React-Redux: https://react-redux.js.org/
