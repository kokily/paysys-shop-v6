import type { ItemType } from "./menu.types";

export interface CartInputs {
  count: string;
  price: string;
}

export interface AddCartRequest {
  item_id: string;
  count: number;
  price: number;
}

export interface CartItemType extends ItemType {
  count: number;
  price: number;
  amount: number;
}

export interface CartType {
  id: string;
  user_id: string;
  completed: boolean;
  deleted: boolean;
  bill_id: string;
  items: CartItemType[];
}