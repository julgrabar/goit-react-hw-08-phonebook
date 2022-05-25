import { configureStore} from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { authApi } from "./auth/authAPI";
import { persistedReducer } from "./auth/authSlice";
import { contactsApi } from "./contacts/contactsAPI";
import { filterReducer } from "./contacts/contactsSlice";


export const store = configureStore({
    reducer:{
      [contactsApi.reducerPath]: contactsApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      auth:persistedReducer,
      filter: filterReducer,
    },
     middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
    authApi.middleware
  ],
  }
)


export const persistor = persistStore(store)