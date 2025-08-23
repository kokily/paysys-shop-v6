import type { AddBillPayload, BillType } from '../../types/bill.types';
import api from './api';

export const addBill = async (payload: AddBillPayload): Promise<BillType> => {
  const response = await api.post('/bills', payload);
  return response.data;
};
