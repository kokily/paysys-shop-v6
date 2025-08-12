export type NativeType = 'member' | 'associate' | 'general';
export type NativeLabel = '회원' | '준회원' | '일반';

export interface MenuType {
  id: number;
  divide: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuType[];
}

export interface ItemType {
  id: string;
  num: number;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}

export interface CartItemType {
  id: string;
  num: number;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
}