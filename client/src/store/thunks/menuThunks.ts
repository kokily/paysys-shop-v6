import type { AddMenuPayload, ListMenuParams } from '../../types/item.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMenu, listMenu, readMenu } from '../services/menuService';

export const listMenuAsync = createAsyncThunk(
  'menu/list',
  async (params: ListMenuParams, { rejectWithValue }) => {
    try {
      return await listMenu(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '메뉴 가져오기 실패');
    }
  }
);

export const readMenuAsync = createAsyncThunk(
  'menu/read',
  async (id: string, { rejectWithValue }) => {
    try {
      return await readMenu(id);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : '메뉴 세부정보 가져오기 실패'
      );
    }
  }
);

export const addMenuAsync = createAsyncThunk(
  'menu/add',
  async (payload: AddMenuPayload, { rejectWithValue }) => {
    try {
      return await addMenu(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '메뉴 전송 실패');
    }
  }
);
