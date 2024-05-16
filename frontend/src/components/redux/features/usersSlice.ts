import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { RoleType, UserType } from '../../../types/UserType';

interface UserSliceState {
    user: UserType;
}


const initialState: UserSliceState = {
    user: {
        token: '',
        registeredUser: {
            firstName: '',
            lastName: '',
            email: '',
            role: RoleType.User,
        }
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {
                token: '',
                registeredUser: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: RoleType.User,
                }
            };
        },
        updateUserToken: (state, action: PayloadAction<string>) => {
            state.user.token = action.payload;
        }
    }
});

export const { setUser, clearUser, updateUserToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
