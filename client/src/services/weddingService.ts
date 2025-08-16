import type { ConvertedAddWedding, ConvertedUpdateWedding, WeddingType } from "@/types/wedding.types";
import api from "./api";

/**
 * 웨딩 빌지 추가 API 호출
 * @param payload 품목 추가 정보 (ConvertedAddWedding)
 * @returns 추가 성공 응답
 */
export const addWedding = async (
  payload: ConvertedAddWedding
): Promise<WeddingType> => {
  const response = await api.post('/weddings', payload);
  return response.data;
};

/**
 * 웨딩 빌지 수정 API 호출
 * @param id 웨딩 빌지 ID
 * @param payload 빌지 ID, ConvertedUpdateWedding
 * @returns 변경 성공 메시지
 */
export const updateWedding = async (
  payload: ConvertedUpdateWedding
): Promise<{ message: string }> => {
  const { id, ...payloadWithoutId } = payload;

  const response = await api.patch(`/weddings/${id}`, payloadWithoutId);
  return response.data;
}

/**
 * 웨딩 빌지 리스트 조회 API 호출
 * @param params 조회 조건 (husband_name, bride_name, start_date, end_date, cursor)
 * @returns 웨딩 빌지 리스트
 */
export const listWeddings = async (params: {
  search?: string;
  cursor?: string;
}): Promise<WeddingType[]> => {
  const queryParams = new URLSearchParams();

  if (params.search) queryParams.append('search', params.search);
  if (params.cursor) queryParams.append('cursor', params.cursor);

  const response = await api.get(`/weddings?${queryParams.toString()}`);
  return response.data;
}

/**
 * 웨딩 빌지 상세 조회 API 호출
 * @param id 웨딩 빌지 ID
 * @returns 웨딩 빌지 상세 정보
 */
export const readWedding = async (id: string): Promise<WeddingType> => {
  const response = await api.get(`/weddings/${id}`);
  return response.data;
};

/**
 * 웨딩 빌지 삭제 API 호출
 * @param id 웨딩 빌지 ID
 * @returns 삭제 성공 응답
 */
export const removeWedding = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/weddings/${id}`);
  return response.data;
};