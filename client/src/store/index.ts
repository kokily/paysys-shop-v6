import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import headerReducer from './slices/headerSlice';
import nativeReducer from './slices/nativeSlice';
import menuReducer from './slices/menuSlice';
import cartReducer from './slices/cartSlice';
import billReducer from './slices/billSlice';
import reserveReducer from './slices/reserveSlice';
import userReducer from './slices/userSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    native: nativeReducer,
    menu: menuReducer,
    cart: cartReducer,
    bill: billReducer,
    reserve: reserveReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;