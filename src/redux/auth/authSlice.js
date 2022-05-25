import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { authApi } from './authAPI';


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
        state.token = null;
      state.user.name = null;
      state.user.email = null;
      state.isLoggedIn = false;
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
export const getIsLogged = state => state.auth.isLoggedIn;
export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;