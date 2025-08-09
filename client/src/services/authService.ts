import type { CheckAuthResponse, LoginCredentials, LoginResponse } from "../types/auth.types";
import api from "./api";

/**
 * 인증 관련 API 서비스
 * - 백엔드 API와의 통신 담당
 * - 에러 처리 및 응답 변환
 */

/**
 * 로그인 API 호출
 * @param credential 사용자 인증 정보
 * @returns 로그인 응답 데이터
 */
export const login = async (credential: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', credential);
  return response.data;
};

/**
 * 로그아웃 API 호출
 * - 토큰은 인터셉터에서 자동으로 추가
 */
export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

/**
 * 인증 상태 확인 API 호출
 * - 토큰은 인터셉터에서 자동으로 추가
 * @returns 사용자 정보
 */
export const checkAuth = async (): Promise<CheckAuthResponse> => {
  const response = await api.get('/auth/check');
  return response.data;
};