import { store } from '@/store';
import { resetStore } from '@/store/slices/rootSlice';
import axios from 'axios';

/**
 * axios 인스턴스 생성
 * - 기본 설정 및 인터셉터 구성
 */
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 모든 요청에 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      store.dispatch(resetStore());
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;