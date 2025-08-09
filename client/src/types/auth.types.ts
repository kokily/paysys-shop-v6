/**
 * 인증 관련 타입 정의
 * - 서비스와 슬라이스에서 공통으로 사용
 */

/**
 * 로그인 요청 데이터
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * 사용자 정보
 */
export interface User {
  user_id: string;
  username: string;
  admin: boolean;
}

/**
 * 로그인 응답 데이터
 */
export interface LoginResponse {
  user_id: string;
  username: string;
  admin: boolean;
  access_token: string;
}

/**
 * 인증 확인 응답 데이터
 */
export interface CheckAuthResponse extends User {}