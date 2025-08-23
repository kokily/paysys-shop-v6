import type { MenuItemType } from './item.types';

export interface CartItemType extends MenuItemType {
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
