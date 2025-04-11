import { SalesRep } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Define a services using base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getData: builder.query<SalesRep[], void>({
      query: () => "data",
    }),
    askAI: builder.mutation<{ answer: string }, { question: string }>({
      query: (body) => ({
        url: "/ai",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetDataQuery, useAskAIMutation } = api;
