// Menu 타입들
export type NativeType = 'member' | 'associate' | 'general';
export type NativeLabel = '회원' | '준회원' | '일반';

export interface MenuType {
  id: number;
  divide: string;
}

export interface MenuItemType {
  id: string;
  num: number;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}

export interface ListMenuParams {
  divide: string;
  native: string;
}

export type ListMenuResponse = MenuItemType[];

export type ReadMenuResponse = MenuItemType;

// Input은 전부 string으로 처리
export interface MenuInputs {
  count: string;
  price: string;
}

export interface AddMenuPayload {
  item_id: string;
  count: number;
  price: number;
}
