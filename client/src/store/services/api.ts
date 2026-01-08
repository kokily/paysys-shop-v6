import axios, { type InternalAxiosRequestConfig } from 'axios';
import { store } from '..';
import { resetStore } from '../slices/rootSlice';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://paysys.kr/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송을 위해 추가
});

// JWT 토큰 만료 시간 체크 유틸리티
const isTokenExpiringSoon = (token: string, thresholdMinutes: number = 5) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    const threshold = thresholdMinutes * 60 * 1000;

    return exp - now < threshold;
  } catch {
    return true;
  }
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = axios
    .post(
      `${api.defaults.baseURL}/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      return access_token;
    })
    .catch((error) => {
      localStorage.removeItem('token');
      store.dispatch(resetStore());
      window.location.href = '/';
      throw error;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    })

  return refreshPromise;
}

// Request Interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
      if (isTokenExpiringSoon(token)) {
        try {
          const newToken = await refreshAccessToken();
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        store.dispatch(resetStore());
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;