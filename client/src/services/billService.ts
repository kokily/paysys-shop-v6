import type { AddBillRequest, AddBillResponse, BillType } from "@/types/bill.types"
import api from "./api"

/**
 * 전표 추가 API 호출
 * @param payload 전표 추가 정보 (title, hall, etc)
 * @returns 추가 성공 응답
 */
export const addBill = async (payload: AddBillRequest): Promise<AddBillResponse> => {
  const response = await api.post('/bills', payload);
  return response.data;
}

/**
 * 전표 리스트 조회 API 호출
 * @param params 조회 조건 (cursor, title, hall, user_id)
 * @returns 전표 리스트
 */
export const listBills = async (params: {
  cursor?: string;
  title?: string;
  hall?: string;
  user_id?: string;
}): Promise<BillType[]> => {
  const queryParams = new URLSearchParams();

  if (params.cursor) queryParams.append('cursor', params.cursor);
  if (params.title) queryParams.append('title', params.title);
  if (params.hall) queryParams.append('hall', params.hall);
  if (params.user_id) queryParams.append('user_id', params.user_id);

  const response = await api.get(`/bills?${queryParams.toString()}`);
  return response.data;
}