import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
reducerPath: 'postsApi',
baseQuery: fetchBaseQuery({
baseUrl: 'https://jsonplaceholder.typicode.com/',
}),
keepUnusedDataFor: 60,
endpoints: (builder) => ({
getPosts: builder.query({
query: () => 'posts?_limit=10',
}),
getPost: builder.query({
query: (id) => `posts/${id}`,
}),
}),
});

export const { useGetPostsQuery, useGetPostQuery } = postsApi;
