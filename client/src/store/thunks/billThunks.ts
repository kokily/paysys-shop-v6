import type { AddBillPayload } from '../../types/bill.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBill } from '../services/billService';

export const addBillAsync = createAsyncThunk(
  'bill/add',
  async (payload: AddBillPayload, { rejectWithValue }) => {
    try {
      return await addBill(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '빌지 추가 실패');
    }
  }
);
