import type { AddBillPayload, ListBillsParams } from '../../types/bill.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBill, listBills, readBill, removeBill, restoreBill } from '../services/billService';

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

export const listBillsAsync = createAsyncThunk(
  'bill/list',
  async (params: ListBillsParams, { rejectWithValue }) => {
    try {
      return await listBills(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '빌지 리스트 조회 실패');
    }
  }
);

export const loadMoreBillsAsync = createAsyncThunk(
  'bill/loadMore',
  async (params: ListBillsParams, { rejectWithValue }) => {
    try {
      return await listBills(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '빌지 리스트 조회 실패');
    }
  }
);

export const readBillAsync = createAsyncThunk('bill/read', async (id: string, { rejectWithValue }) => {
  try {
    return await readBill(id);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '빌지 상세 조회 실패');
  }
});

export const removeBillAsync = createAsyncThunk('bill/remove', async (id: string, { rejectWithValue }) => {
  try {
    return await removeBill(id);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '빌지 삭제 실패');
  }
});

export const restoreBillAsync = createAsyncThunk('bill/restore', async (id: string, { rejectWithValue }) => {
  try {
    return await restoreBill(id);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '빌지 카트 복원 실패');
  }
});
