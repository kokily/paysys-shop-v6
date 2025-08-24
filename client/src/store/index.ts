import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import nativeSlice from './slices/nativeSlice';
import menuSlice from './slices/menuSlice';
import headerSlice from './slices/headerSlice';
import cartSlice from './slices/cartSlice';
import billSlice from './slices/billSlice';
import mobileSlice from './slices/mobileSlice';
import modalSlice from './slices/modalSlice';
import rootSlice from './slices/rootSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['native', 'menu', 'header', 'cart', 'bill', 'mobile'],
  blacklist: ['modal', 'auth'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  native: nativeSlice,
  menu: menuSlice,
  header: headerSlice,
  cart: cartSlice,
  bill: billSlice,
  mobile: mobileSlice,
  modal: modalSlice,
  root: rootSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
