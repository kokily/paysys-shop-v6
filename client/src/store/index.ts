import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import rootSlice from './slices/rootSlice';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  blacklist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
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

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
