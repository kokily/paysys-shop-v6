import type { CheckAuthResponse, LoginPayload, LoginResponse } from '../../types/auth.types';
import api from './api';

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const checkAuth = async (): Promise<CheckAuthResponse> => {
  const response = await api.get('/auth/check');
  return response.data;
};
