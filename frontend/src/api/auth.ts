import apiClient from './client';
import type { LoginRequest, LoginResponse, User } from '../types';

export const authApi = {
  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  // 현재 사용자 정보 조회 (기존 프로젝트와 동일한 엔드포인트)
  check: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/check');
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
}; 