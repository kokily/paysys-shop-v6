import type { AddItemRequest, ItemType, UpdateItemRequest } from "@/types/item.types";
import api from "./api";

/**
 * 품목 추가 API 호출
 * @param payload 품목 추가 정보 (name, divide, native, unit, price)
 * @returns 추가 성공 응답
 */
export const addItem = async (payload: AddItemRequest): Promise<ItemType> => {
  const { name, divide, native, unit, price } = payload;
  const response = await api.post('/items', {
    name,
    divide,
    native,
    unit,
    price: parseInt(price),
  });
  return response.data;
}

/**
 * 품목 리스트 조회 API 호출
 * @param params 조회 조건 (divide, native, name, cursor)
 * @returns 품목 리스트
 */
export const listItems = async (params: {
  divide?: string;
  native?: string;
  name?: string;
  cursor?: string;  
}): Promise<ItemType[]> => {
  const queryParams = new URLSearchParams();

  if (params.divide) queryParams.append('divide', params.divide);
  if (params.native) queryParams.append('native', params.native);
  if (params.name) queryParams.append('name', params.name);
  if (params.cursor) queryParams.append('cursor', params.cursor);

  const response = await api.get(`/items?${queryParams.toString()}`);
  return response.data;
}

/**
 * 품목 상세 조회 API 호출
 * @param id 품목 ID
 * @returns 품목 상세 정보
 */
export const readItem = async (id: string): Promise<ItemType> => {
  const response = await api.get(`/items/${id}`);
  return response.data;
}

/**
 * 품목 삭제 API 호출
 * @param id 품목 ID
 * @returns 삭제 성공 응답
 */
export const removeItem = async (id: string): Promise<void> => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
}

/**
 * 품목 수정 API 호출
 * @param payload 품목 ID, 수정할 대상 (name, divide, native, unit, price)
 * @returns 변경 성공 메시지
 */
export const updateItem = async (payload: UpdateItemRequest): Promise<{ message: string }> => {
  const { id, name, divide, native, unit, price } = payload;
  const response = await api.patch(`/items/${id}`, {
    name,
    divide,
    native,
    unit,
    price: price && parseInt(price),
  });
  return response.data;
}