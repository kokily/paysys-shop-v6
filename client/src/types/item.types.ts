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

// Item 타입들
export interface ItemType {
  id: string;
  num: number;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface ListItemsParams {
  divide?: string;
  native?: string;
  name?: string;
  cursor?: string;
}

export interface AddItemPayload {
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}

export interface AddItemRequest {
  name: string;
  divide: ItemDivideType;
  native: NativeLabel;
  unit: string;
  price: string;
}

export interface UpdateItemPayload {
  id: string;
  name?: string;
  divide?: string;
  native?: string;
  unit?: string;
  price?: number;
}

export type ItemDivideType =
  | '식사(뷔페)'
  | '식사(중식)'
  | '식사(양식)'
  | '식사(한식)'
  | '식사(수행)'
  | '식사(다과)'
  | '대관료'
  | '레드와인'
  | '화이트와인/샴페인'
  | '주스/차'
  | '민속주/고량주'
  | '양주'
  | '기타주류'
  | '칵테일'
  | '반입료'
  | '부대비용';
