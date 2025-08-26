import type { AddItemPayload, ListItemsParams, UpdateItemPayload } from '../../types/item.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addItem, listItems, readItem, removeItem, updateItem } from '../services/itemService';

export const listItemsAsync = createAsyncThunk(
  'item/list',
  async (params: ListItemsParams, { rejectWithValue }) => {
    try {
      return await listItems(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 리스트 조회 실패');
    }
  }
);

export const loadMoreItemsAsync = createAsyncThunk(
  'item/loadMore',
  async (params: ListItemsParams, { rejectWithValue }) => {
    try {
      return await listItems(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 리스트 조회 실패');
    }
  }
);

export const readItemAsync = createAsyncThunk('item/read', async (id: string, { rejectWithValue }) => {
  try {
    return await readItem(id);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '품목 상세보기 실패');
  }
});

export const addItemAsync = createAsyncThunk(
  'item/add',
  async (payload: AddItemPayload, { rejectWithValue }) => {
    try {
      return await addItem(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 추가 실패');
    }
  }
);

export const removeItemAsync = createAsyncThunk('item/remove', async (id: string, { rejectWithValue }) => {
  try {
    return await removeItem(id);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '품목 삭제 실패');
  }
});

export const updateItemAsync = createAsyncThunk(
  'item/update',
  async (payload: UpdateItemPayload, { rejectWithValue }) => {
    try {
      return await updateItem(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 수정 실패');
    }
  }
);
