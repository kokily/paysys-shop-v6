import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CheckAuthResponse, LoginPayload, User } from '../../types/auth.types';
import { checkAuthAsync, loginAsync, logoutAsync } from '../thunks/authThunks';

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  form: {
    username: string;
    password: string;
  };
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  form: {
    username: '',
    password: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateAuthForm: (state, action: PayloadAction<Partial<LoginPayload>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearAuthForm: (state) => {
      state.form = initialState.form;
    },
  },
  extraReducers: (builder) => {
    // Login Actions
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.user_id,
          username: action.payload.username,
          admin: action.payload.admin,
        };
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.form = initialState.form;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout Action
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Check Auth Action
    builder
      .addCase(checkAuthAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action: PayloadAction<CheckAuthResponse>) => {
        state.loading = false;
        state.user = {
          id: action.payload.user_id,
          username: action.payload.username,
          admin: action.payload.admin,
        };
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, updateAuthForm, clearAuthForm } = authSlice.actions;
export default authSlice.reducer;
