export interface CartInputs {
  count: string;
  price: string;
}

export interface AddCartRequest {
  item_id: string;
  count: number;
  price: number;
}