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
import { authApi, persistedReducer } from "./authSlice";
import { contactsApi } from "./contactsSlice";
import { filterReducer } from "./contactsSlice";



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