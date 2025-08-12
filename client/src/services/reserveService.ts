import type { BillType } from "@/types/bill.types";
import type { AddReserveRequest } from "@/types/reserve.types";
import api from "./api";

/**
 * 예약금 추가 API 호출
 * @param payload 예약금 추가 항목
 * @returns 전표 응답
 */
export const addReserve = async (payload: AddReserveRequest): Promise<BillType> => {
  const response = await api.post('/reserve', payload);
  return response.data;
}

/**
 * 예약금 삭제 API 호출
 * @param id 전표 ID
 * @returns 전표 응답
 */
export const removeReserve = async (id: string): Promise<BillType> => {
  const response = await api.delete(`/reserve/${id}`);
  return response.data;
}