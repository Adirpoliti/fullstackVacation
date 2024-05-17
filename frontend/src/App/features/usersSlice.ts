import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { RoleType, UserType } from "../../types/UserType";

interface UserSliceState {
  user: UserType;
}

const defaultUser: UserType = {
  token: "",
  registeredUser: {
    firstName: "",
    lastName: "",
    email: "",
    role: RoleType.User,
  },
};

const getUserFromLocalStorage = (): UserType => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      return JSON.parse(userData) as UserType;
    } catch (error) {
      console.error('Error parsing user data from localStorage', error);
      return defaultUser;
    }
  }
  return defaultUser;
};

const initialState: UserSliceState = {
  user: getUserFromLocalStorage(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearUser: (state) => {
      state.user = defaultUser;
      localStorage.removeItem('user');
    },
    updateUserToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { setUser, clearUser, updateUserToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;