import type { AddSignPayload, RemoveSignPayload } from '../../types/sign.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addSign, removeSign } from '../services/signService';

export const addSignAsync = createAsyncThunk(
  'sign/add',
  async (payload: AddSignPayload, { rejectWithValue }) => {
    try {
      return await addSign(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '서명 추가 실패');
    }
  }
);

export const removeSignAsync = createAsyncThunk(
  'sign/remove',
  async (payload: RemoveSignPayload, { rejectWithValue }) => {
    try {
      return await removeSign(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '서명 삭제 실패');
    }
  }
);
