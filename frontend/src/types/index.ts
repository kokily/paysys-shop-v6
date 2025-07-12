// 사용자 관련 타입
export interface User {
  id: number;
  username: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
}

// 로그인 관련 타입
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
} 