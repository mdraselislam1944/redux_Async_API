// BaseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BaseApi = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: "api",
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/tasks"
      }),
    }),
    setTasks: builder.mutation({
      query: (post) => ({ // Ensure 'post' is a parameter here
        url: "/tasks",
        method: "POST",
        body: post,
      })
    }),
    updateTasks:builder.mutation({
        query:({ id, data })=>({
            url: `/tasks/${id}`,
            method: "PATCH",
            body:data,
        })
    }),
    deleteTasks:builder.mutation({
        query:(id)=>({
            url: `/tasks/${id}`,
            method: "DELETE",
        }),
    }),
  }),
});

export const { useGetPostsQuery, useSetTasksMutation,useUpdateTasksMutation,useDeleteTasksMutation} = BaseApi;
export default BaseApi;
