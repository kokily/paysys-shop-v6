import type { ChangePasswordRequest, SetAdminRequest, UserType } from "@/types/user.types";
import api from "./api";

/**
 * 사용자 리스트 조회 API 호출
 * @param params 조회 조건 (Cursor, 사용자명 필터)
 * @returns 사용자 리스트
 */
export const listUsers = async (params: {
  cursor?: string;
  username?: string;
}): Promise<UserType[]> => {
  const queryParams = new URLSearchParams();

  if (params.cursor) queryParams.append('cursor', params.cursor);
  if (params.username) queryParams.append('username', params.username);

  const response = await api.get(`/users?${queryParams.toString()}`);
  return response.data;
};

/**
 * 특정 사용자 상세 조회 API 호출
 * @param id 사용자 ID
 * @returns 사용자 상세 정보
 */
export const readUser = async (id: string): Promise<UserType> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

/**
 * 특정 사용자 삭제 API 호출
 * @param id 사용자 ID
 * @returns 삭제 성공 메시지
 */
export const removeUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

/**
 * 관리자 권한 설정 API 호출
 * @param payload 관리자 권한 설정 정보
 * @returns 설정 성공 메시지
 */
export const setAdmin = async (payload: SetAdminRequest): Promise<{ message: string }> => {
  const response = await api.post('/users/admin', payload);
  return response.data;
};

/**
 * 비밀번호 변경 API 호출
 * @param payload 비밀번호 변경 정보
 * @returns 변경 성공 메시지
 */
export const changePassword = async (payload: ChangePasswordRequest): Promise<{ message: string }> => {
  const response = await api.patch('/users/password', payload);
  return response.data;
};