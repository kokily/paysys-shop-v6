import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeCart, removeOneCart, viewCart } from '../services/cartService';

export const viewCartAsync = createAsyncThunk('cart/view', async (_, { rejectWithValue }) => {
  try {
    return await viewCart();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '카트 조회 실패');
  }
});

export const removeOneCartAsync = createAsyncThunk(
  'cart/removeOne',
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeOneCart(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 삭제 실패');
    }
  }
);

export const removeCartAsync = createAsyncThunk(
  'cart/removeCart',
  async (_, { rejectWithValue }) => {
    try {
      return await removeCart();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '카트 삭제 실패');
    }
  }
);
