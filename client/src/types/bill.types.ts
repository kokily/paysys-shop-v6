import type { CartItemType } from './cart.types';

export interface BillType {
  id: string;
  title: string;
  hall: string;
  etc: string;
  total_amount: number;
  items: CartItemType[];
  reserve?: number;
  username: string;
  user_id: string;
  cart_id: string;
  created_at: Date;
}

export interface AddBillPayload {
  title: string;
  hall: string;
  etc: string;
}
