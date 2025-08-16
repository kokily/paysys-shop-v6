import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import headerReducer from './slices/headerSlice';
import nativeReducer from './slices/nativeSlice';
import menuReducer from './slices/menuSlice';
import cartReducer from './slices/cartSlice';
import billReducer from './slices/billSlice';
import reserveReducer from './slices/reserveSlice';
import userReducer from './slices/userSlice';
import itemReducer from './slices/itemSlice';
import signReducer from './slices/signSlice';
import weddingReducer from './slices/weddingSlice';
import mobileReducer from './slices/mobileSlice';
import modalReducer from './slices/modalSlice';
import rootSlice from './slices/rootSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bill', 'cart', 'header', 'item', 'menu', 'native', 'reserve', 'user', 'sign', 'wedding'],
  blacklist: ['modal', 'auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  header: headerReducer,
  native: nativeReducer,
  menu: menuReducer,
  cart: cartReducer,
  bill: billReducer,
  reserve: reserveReducer,
  user: userReducer,
  item: itemReducer,
  sign: signReducer,
  wedding: weddingReducer,
  mobile: mobileReducer,
  modal: modalReducer,
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