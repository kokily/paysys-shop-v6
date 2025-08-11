import type { AddBillRequest, AddBillResponse } from "@/types/bill.types"
import api from "./api"

export const addBill = async (payload: AddBillRequest): Promise<AddBillResponse> => {
  const response = await api.post('/bills', payload);
  return response.data;
}