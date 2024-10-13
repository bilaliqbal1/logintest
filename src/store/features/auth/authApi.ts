import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query with credentials included
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    // credentials: "include", // Send cookies with every request
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { username: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
    }),
    validateToken: builder.query<{ valid: boolean }, void>({
      query: () => "/auth/validate",
    }),
  }),
});

export const { useLoginMutation, useValidateTokenQuery } = authApi;
