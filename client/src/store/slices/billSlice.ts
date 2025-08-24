import type { PayloadAction } from '@reduxjs/toolkit';
import type { BillType } from '../../types/bill.types';
import { createSlice } from '@reduxjs/toolkit';
import {
  addReserveAsync,
  listBillsAsync,
  loadMoreBillsAsync,
  readBillAsync,
  removeBillAsync,
  removeReserveAsync,
  restoreBillAsync,
} from '../thunks/billThunks';

interface BillState {
  bills: BillType[];
  currentBill: BillType | null;
  loading: boolean;
  error: string | null;
  title: string;
  hall: string;
  user_id: string;
  cursor: string | null;
  hasMore: boolean;
  scrollY: number;
  reserve: number;
}

const initialState: BillState = {
  bills: [],
  currentBill: null,
  loading: false,
  error: null,
  title: '',
  hall: '',
  user_id: '',
  cursor: null,
  hasMore: true,
  scrollY: 0,
  reserve: 0,
};

const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
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
    clearCurrentBill: (state) => {
      state.currentBill = null;
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
    updateReserveForm: (state, action: PayloadAction<number>) => {
      state.reserve = action.payload;
    },
    clearReserveForm: (state) => {
      state.reserve = 0;
    },
  },
  extraReducers: (builder) => {
    // List Bills Action
    builder
      .addCase(listBillsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listBillsAsync.fulfilled, (state, action: PayloadAction<BillType[]>) => {
        const bills = action.payload;

        state.loading = false;
        state.bills = bills;
        state.cursor = bills.length > 0 ? bills[bills.length - 1].id : null;
        state.hasMore = bills.length === 30;
      })
      .addCase(listBillsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Load More Bills Action
    builder
      .addCase(loadMoreBillsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreBillsAsync.fulfilled, (state, action: PayloadAction<BillType[]>) => {
        const loadMoreBills = action.payload;

        state.loading = false;
        state.bills = [...state.bills, ...loadMoreBills];
        state.cursor = loadMoreBills.length > 0 ? loadMoreBills[loadMoreBills.length - 1].id : null;
        state.hasMore = loadMoreBills.length === 30;
      })
      .addCase(loadMoreBillsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Read Bill Action
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

    // Remove Bill Action
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

    // Restore Bill Action
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

    // Add Reserve Action
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

    // Remove Reserve Action
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

export const {
  setTitle,
  setHall,
  setUserId,
  clearBills,
  clearCurrentBill,
  clearError,
  setScrollY,
  clearScrollY,
  updateReserveForm,
  clearReserveForm,
} = billSlice.actions;
export default billSlice.reducer;
