import type { LoginPayload } from '../../types/auth.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkAuth, login, logout } from '../services/authService';
import { refreshAccessToken } from '../services/api';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const data = await login(payload);
      localStorage.setItem('token', data.access_token);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '로그인 실패');
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logout();
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    return rejectWithValue(error instanceof Error ? error.message : '로그아웃 실패');
  }
});

export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
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
  } catch (error: any) {
    try {
      const newToken = await refreshAccessToken();
      const userData = await checkAuth();

      return {
        ...userData,
        access_token: newToken,
      };
    } catch (refreshError: any) {
      const status = refreshError?.response?.status;

      if (!refreshError?.response) {
        return rejectWithValue('네트워크 문제로 인증 확인 실패');
      }

      if (status === 401) {
        localStorage.removeItem('token');
        return rejectWithValue('로그인이 만료되었습니다');  
      }
      
      localStorage.removeItem('token');
      return rejectWithValue('인증 실패');
    }
  }
});
