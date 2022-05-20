import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const init = {
    filter: ""
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: init,
  reducers: {
    filterContacts(state, action){
        state.filter=action.payload;
    }
  },
});


export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://62812fd61020d85205867d76.mockapi.io' }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts']
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: `/contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts']
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts']
    }),
  })
})

export const getFilterValue = store => store.filter.filter;
export const filterReducer =  contactsSlice.reducer;
export const { useGetContactsQuery, useAddContactMutation,useDeleteContactMutation} = contactsApi;
export const {filterContacts } = contactsSlice.actions;