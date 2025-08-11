import type { AddCartRequest } from "@/types/cart.types";
import api from "./api";

/**
 * 카트에 아이템 추가 API 호출
 * @param payload 카트 추가 정보 (item_id, count, price)
 * @returns 추가 성공 응답
 */
export const addCart = async (payload: AddCartRequest): Promise<void> => {
  const response = await api.post('/cart/add', payload);
  return response.data;
}