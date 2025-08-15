import type { MenuItemType } from "@/types/menu.types"
import api from "./api";
import type { FilterType } from "@/store/slices/menuSlice";

/**
 * 메뉴 리스트 API 조회
 * - divide, native 파라미터로 필터링
 * - 페이지네이션 지원 (Cursor 기반)
 * @param params 조회 파라미터 (divide, native)
 * @returns 메뉴 리스트 데이터
 */
export const listMenu = async ({ divide, native }: FilterType): Promise<MenuItemType[]> => {
  const response = await api.get('/items', { params: { divide, native } });
  return response.data;
};

/**
 * 메뉴 상세 조회 API 호출
 * - ID로 특정 메뉴 조회
 * - 토큰은 인터셉터에서 자동 추가
 * @param id 메뉴 ID (uuid)
 * @returns 메뉴 상세 데이터
 */
export const readMenu = async (id: string): Promise<MenuItemType> => {
  const response = await api.get(`/items/${id}`);
  return response.data;
}