import type { BillType } from "@/types/bill.types";
import { listBills, readBill, removeBill, restoreBill } from "@/services/billService";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BillState {
  bills: BillType[];
  currentBill: BillType | null;
  loading: boolean;
  error: string | null;
  search: string;
  hall: string;
  user_id: string;
  hasMore: boolean;
  cursor: string | null;
  scrollY: number;
};

const initialState: BillState = {
  bills: [],
  currentBill: null,
  loading: false,
  error: null,
  search: '',
  hall: '',
  user_id: '',
  hasMore: true,
  cursor: null,
  scrollY: 0,
};

export const listBillsAsync = createAsyncThunk(
  'bill/listBills',
  async (params: {
    cursor?: string;
    title?: string;
    hall?: string;
    user_id?: string;
  }, { rejectWithValue }) => {
    try {
      return await listBills(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '전표 리스트 조회 실패');
    }
  }
);

export const loadMoreBillsAsync = createAsyncThunk(
  'bill/loadMore',
  async (params: {
    cursor?: string;
    title?: string;
    hall?: string;
    user_id?: string;
  }, { rejectWithValue }) => {
    try {
      return await listBills(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '추가 전표 로딩 실패');
    }
  }
);

export const readBillAsync = createAsyncThunk(
  'bill/readBill',
  async (id: string, { rejectWithValue }) => {
    try {
      return await readBill(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '전표 상세 정보 로딩 실패');
    }
  }
);

export const removeBillAsync = createAsyncThunk(
  'bill/removeBill',
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeBill(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '전표 삭제 실패');
    }
  }
);

export const restoreBillAsync = createAsyncThunk(
  'bill/restoreBill',
  async (id: string, { rejectWithValue }) => {
    try {
      return await restoreBill(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '전표 복원 실패');
    }
  }
);

const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setHall: (state, action: PayloadAction<string>) => {
      state.hall = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },
    clearBills: (state) => {
      state.bills = [];
      state.cursor = null;
      state.hasMore = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    setScrollY: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload;
    },
    clearScrollY: (state) => {
      state.scrollY = 0;
    },
    clearCurrentBill: (state) => {
      state.currentBill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listBillsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listBillsAsync.fulfilled, (state, action: PayloadAction<BillType[]>) => {
        state.loading = false;
        state.bills = action.payload;
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(listBillsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    builder
      .addCase(loadMoreBillsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreBillsAsync.fulfilled, (state, action: PayloadAction<BillType[]>) => {
        state.loading = false;
        state.bills = [...state.bills, ...action.payload];
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(loadMoreBillsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(readBillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readBillAsync.fulfilled, (state, action: PayloadAction<BillType>) => {
        state.loading = false;
        state.currentBill = action.payload;
      })
      .addCase(readBillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      
    builder
      .addCase(removeBillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBillAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeBillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(restoreBillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreBillAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(restoreBillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearch,
  setHall,
  setUserId,
  clearBills,
  clearError,
  setScrollY,
  clearScrollY
} = billSlice.actions;
export default billSlice.reducer;
