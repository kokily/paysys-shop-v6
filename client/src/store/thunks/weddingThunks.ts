import type { ConvertedAddWedding, ConvertedUpdateWedding } from '../../types/wedding.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addWedding,
  listWeddings,
  readWedding,
  removeWedding,
  updateWedding,
} from '../services/weddingService';

export const addWeddingAsync = createAsyncThunk(
  'wedding/add',
  async (payload: ConvertedAddWedding, { rejectWithValue }) => {
    try {
      return await addWedding(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 빌지 추가 실패');
    }
  }
);

export const listWeddingsAsync = createAsyncThunk(
  'wedding/list',
  async (params: { cursor?: string }, { rejectWithValue }) => {
    try {
      return await listWeddings(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 리스트 조회 실패');
    }
  }
);

export const loadMoreWeddingsAsync = createAsyncThunk(
  'wedding/loadMore',
  async (params: { cursor?: string }, { rejectWithValue }) => {
    try {
      return await listWeddings(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 리스트 추가 로딩 실패');
    }
  }
);

export const readWeddingAsync = createAsyncThunk('wedding/read', async (id: string, { rejectWithValue }) => {
  try {
    return await readWedding(id);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '웨딩 상세보기 실패');
  }
});

export const removeWeddingAsync = createAsyncThunk(
  'wedding/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeWedding(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 빌지 삭제 실패');
    }
  }
);

export const updateWeddingAsync = createAsyncThunk(
  'wedding/update',
  async (payload: ConvertedUpdateWedding, { rejectWithValue }) => {
    try {
      return await updateWedding(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 빌지 수정 실패');
    }
  }
);
