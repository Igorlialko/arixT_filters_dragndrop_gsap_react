import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import {usersApi} from "./api/usersAdminApi";


export const store = configureStore({
  reducer: {
    userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(({
      serializableCheck: false,
    })).concat([
      usersApi.middleware,
    ]),
});


export type TypeRootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
