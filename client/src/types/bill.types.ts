import type { ItemType } from "./menu.types";

export interface BillType {
  id: string;
  title: string;
  hall: string;
  etc: string;
  total_amount: number;
  items: ItemType[];
  reserve?: number;
  username: string;
  user_id: string;
  cart_id: string;
  created_at: Date;
}

export interface AddBillRequest {
  title: string;
  hall: string;
  etc: string;
}

export interface AddBillResponse {
  id: string;
}