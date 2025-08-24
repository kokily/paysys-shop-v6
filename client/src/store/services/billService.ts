import type { AddBillPayload, BillType, ListBillsParams } from '../../types/bill.types';
import type { CartType } from '../../types/cart.types';
import api from './api';

export const addBill = async (payload: AddBillPayload): Promise<BillType> => {
  const response = await api.post('/bills', payload);
  return response.data;
};

export const listBills = async (params: ListBillsParams): Promise<BillType[]> => {
  const queryParams = new URLSearchParams();

  if (params.title) queryParams.append('title', params.title);
  if (params.hall) queryParams.append('hall', params.hall);
  if (params.user_id) queryParams.append('userId', params.user_id);
  if (params.cursor) queryParams.append('cursor', params.cursor);

  const response = await api.get(`/bills?${queryParams.toString()}`);
  return response.data;
};

export const readBill = async (id: string): Promise<BillType> => {
  const response = await api.get(`/bills/${id}`);
  return response.data;
};

export const removeBill = async (id: string): Promise<void> => {
  const response = await api.delete(`/bills/${id}`);
  return response.data;
};

export const restoreBill = async (id: string): Promise<CartType> => {
  const response = await api.patch(`/bills/${id}`);
  return response.data;
};
