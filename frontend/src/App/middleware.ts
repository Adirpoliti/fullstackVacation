import { Middleware } from "@reduxjs/toolkit";
import { setUser, clearUser } from "./features/usersSlice";

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (setUser.match(action) || clearUser.match(action)) {
    const state = store.getState();
    localStorage.setItem('user', JSON.stringify(state.user.user));
  }

  return result;
};

export default localStorageMiddleware;