import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com/users',
        prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
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
                method: 'GET',
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

const init = {
    user: {name: null, email: null },
    token: null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: init,
    extraReducers: (builder) => {
        builder.addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
            state.token = payload.token
            state.user = payload.user
            state.isLoggedIn=true
        }
        );
        builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.token = null
        state.user = {name: null, email: null }
        state.isLoggedIn=false
      }
      
    );
    builder.addMatcher(
        authApi.endpoints.signup.matchFulfilled,
        (state, { payload }) => {
            state.token = payload.token;
            state.user = payload.user;
            state.isLoggedIn=true;
        }
        );
    builder.addMatcher(
        authApi.endpoints.refreshLogin.matchFulfilled,
        (state, { payload }) => {
            state.user = payload;
            state.isLoggedIn=true;
        }
        );
  },
})

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token']
}

export const persistedReducer = persistReducer(persistConfig, authSlice.reducer)


export const {useSignupMutation,useRefreshLoginQuery, useLoginMutation, useLogoutMutation} = authApi;
// export const authReducer = authSlice.reducer;
export const getIsLogged = state => state.auth.isLoggedIn;
export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;