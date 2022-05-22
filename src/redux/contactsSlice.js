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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://connections-api.herokuapp.com/contacts' ,prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
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

export const getFilterValue = store => store.filter.filter;
export const filterReducer =  contactsSlice.reducer;
export const { useGetContactsQuery, useAddContactMutation,useDeleteContactMutation} = contactsApi;
export const {filterContacts } = contactsSlice.actions;