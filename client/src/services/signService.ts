import type { AddSignRequest } from "@/types/sign.types";
import api from "./api";

/**
 * 서명 추가 API 호출
 * @param payload 서명 추가 정보 (weddingId, sex, image)
 * @returns 성공 메시지 응답
 */
export const addSign = async (
  payload: AddSignRequest
): Promise<{ message: string }> => {
  const response = await api.post('/sign', payload);
  return response.data;
}

/**
 * 서명 삭제 API 호출
 * @param id 웨딩 ID
 * @returns 삭제 메시지 응답
 */
export const removeSign = async (
  id: string
): Promise<{ message: string }> => {
  const response = await api.delete(`/sign/${id}`);
  return response.data;
}