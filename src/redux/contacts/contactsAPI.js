import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://connections-api.herokuapp.com/contacts' ,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
  }}),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ``,
      providesTags: ['Contacts']
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: ``,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts']
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts']
    }),
  })
})

export const { useGetContactsQuery, useAddContactMutation,useDeleteContactMutation} = contactsApi;