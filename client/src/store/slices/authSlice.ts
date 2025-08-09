import type { CheckAuthResponse, LoginCredentials, User } from "../../types/auth.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout } from "../../services/authService";

interface AuthState {
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

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
  form: {
    username: '',
    password: '',
  },
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.access_token);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '로그인 실패');
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue('로그아웃 실패');
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      const userData = await checkAuth();
      return {
        ...userData,
        access_token: token,
      };
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error instanceof Error ? error.message : '인증 실패');
    }
  }
);

// 인증관련 Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateForm: (state, action) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearForm: (state) => {
      state.form = {
        username: '',
        password: '',
      };
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
          user_id: action.payload.user_id,
          username: action.payload.username,
          admin: action.payload.admin,
        };
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.form = { username: '', password: '' };
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Logout Actions
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });

    // CheckAuth Actions
    builder
      .addCase(checkAuthAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          user_id: action.payload.user_id,
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

export const { clearError, updateForm, clearForm } = authSlice.actions;
export default authSlice.reducer;