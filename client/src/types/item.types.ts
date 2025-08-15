import type { NativeLabel } from "./menu.types";

export interface ItemType {
  id: string;
  name: string;
  divide: ItemDivideType;
  native: NativeLabel;
  unit: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface AddItemRequest {
  name: string;
  divide: ItemDivideType;
  native: NativeLabel;
  unit: string;
  price: string;
}

export interface UpdateItemRequest {
  id: string;
  name?: string;
  divide?: string;
  native?: string;
  unit?: string;
  price?: string;
}

export type ItemDivideType =
  '식사(뷔페)' |
  '식사(중식)' |
  '식사(양식)' |
  '식사(한식)' |
  '식사(수행)' |
  '식사(다과)' |
  '대관료' |
  '레드와인' |
  '화이트와인/샴페인' |
  '주스/차' |
  '민속주/고량주' |
  '양주' |
  '기타주류' |
  '칵테일' |
  '반입료' |
  '부대비용'

