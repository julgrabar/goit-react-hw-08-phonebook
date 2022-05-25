
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com/users',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;

            if (token) {
            headers.set('authorization', `Bearer ${token}`)
            }

            return headers
  }},),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url : `/signup`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['Auth']
        }),
        refreshLogin : builder.query({
               query: () => ({
                url: `/current`,
            }),
            providesTags: ['Auth']
        }),
        login: builder.mutation({
            query: (user) => ({
                url : `/login`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['Auth']
        }),
        logout: builder.mutation({
            query: () => ({
                url : `/logout`,
                method: "POST",
            }),
            invalidatesTags: ['Auth']
        }),
    })
})

export const {useSignupMutation,useRefreshLoginQuery, useLoginMutation, useLogoutMutation} = authApi;