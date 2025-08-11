import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import headerReducer from './slices/headerSlice';
import nativeReducer from './slices/nativeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    native: nativeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;