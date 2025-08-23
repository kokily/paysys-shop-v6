import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import nativeSlice from './slices/nativeSlice';
import menuSlice from './slices/menuSlice';
import headerSlice from './slices/headerSlice';
import rootSlice from './slices/rootSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['native', 'menu', 'header'],
  blacklist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  native: nativeSlice,
  menu: menuSlice,
  header: headerSlice,
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
