import type { AddCartRequest, CartType } from "@/types/cart.types";
import api from "./api";

/**
 * 카트에 아이템 추가 API 호출
 * @param payload 카트 추가 정보 (item_id, count, price)
 * @returns 추가 성공 응답
 */
export const addCart = async (payload: AddCartRequest): Promise<void> => {
  const response = await api.post('/cart', payload);
  return response.data;
}

/**
 * 카트 조회 API 호출
 * @returns 카트 정보
 */
export const viewCart = async (): Promise<CartType> => {
  const response = await api.get('/cart');
  return response.data;
}

/**
 * 카트 중 특정 아이템 삭제 API 호출
 * @param id 아이템 ID
 * @returns 삭제 성공 응답
 */
export const removeOneCart = async (id: string): Promise<void> => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
}

/**
 * 카트 전체 삭제 API 호출
 * @returns 삭제 성공 응답
 */
export const removeCart = async (): Promise<void> => {
  const response = await api.delete('/cart');
  return response.data;
}
