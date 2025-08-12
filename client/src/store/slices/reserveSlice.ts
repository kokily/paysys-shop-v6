import type { AddReserveRequest } from "@/types/reserve.types";
import { addReserve, removeReserve } from "@/services/reserveService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ReserveState {
  loading: boolean;
  error: string | null;
}

const initialState: ReserveState = {
  loading: false,
  error: null,
}

export const addReserveAsync = createAsyncThunk(
  'reserve/addReserve',
  async (payload: AddReserveRequest, { rejectWithValue }) => {
    try {
      return await addReserve(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '예약금 추가 실패');
    }
  }
);

export const removeReserveAsync = createAsyncThunk(
  'reserve/removeReserve',
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeReserve(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '예약금 삭제 실패');
    }
  }
);

const reserveSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReserveAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReserveAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addReserveAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeReserveAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeReserveAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeReserveAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = reserveSlice.actions;
export default reserveSlice.reducer;