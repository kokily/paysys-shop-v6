import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import headerReducer from './slices/headerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;