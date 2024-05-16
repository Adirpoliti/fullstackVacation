import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/usersSlice';

const rootReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;