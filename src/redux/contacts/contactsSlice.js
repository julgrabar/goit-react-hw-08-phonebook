import { createSlice } from '@reduxjs/toolkit';

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

export const getFilterValue = store => store.filter.filter;
export const filterReducer =  contactsSlice.reducer;
export const {filterContacts } = contactsSlice.actions;