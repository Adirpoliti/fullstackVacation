import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/usersSlice";
import localStorageMiddleware from "./middleware"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;