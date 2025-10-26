import type { PayloadAction } from '@reduxjs/toolkit';
import type { AddWeddingPayload, WeddingType } from '../../types/wedding.types';
import { createSlice } from '@reduxjs/toolkit';
import { weddingForm } from '../../libs/data/weddingData';
import {
  addWeddingAsync,
  listWeddingsAsync,
  loadMoreWeddingsAsync,
  readWeddingAsync,
  removeWeddingAsync,
  updateWeddingAsync,
} from '../thunks/weddingThunks';

interface WeddingState {
  weddings: WeddingType[];
  currentWedding: WeddingType | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  cursor: string | null;
  scrollY: number;
  form: AddWeddingPayload;
}

const initialState: WeddingState = {
  weddings: [],
  currentWedding: null,
  loading: false,
  error: null,
  hasMore: true,
  cursor: null,
  scrollY: 0,
  form: weddingForm,
};

const weddingSlice = createSlice({
  name: 'wedding',
  initialState,
  reducers: {
    updateWeddingForm: (state, action: PayloadAction<Partial<AddWeddingPayload>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearWeddingForm: (state) => {
      state.form = initialState.form;
    },
    clearWeddings: (state) => {
      state.weddings = [];
      state.currentWedding = null;
      state.hasMore = true;
    },
    clearCurrentWedding: (state) => {
      state.currentWedding = null;
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
    setWeddingDate: (state, action: PayloadAction<Date | null>) => {
      state.form.wedding_at = action.payload ? action.payload : new Date();
    },
    setEventTime: (state, action: PayloadAction<string>) => {
      state.form.event_at = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add Wedding Action
    builder
      .addCase(addWeddingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWeddingAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addWeddingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // List Weddings Action
    builder
      .addCase(listWeddingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listWeddingsAsync.fulfilled, (state, action: PayloadAction<WeddingType[]>) => {
        const weddings = action.payload;

        state.loading = false;
        state.weddings = weddings;
        state.cursor = weddings.length > 0 ? weddings[weddings.length - 1].id : null;
        state.hasMore = weddings.length === 30;
      })
      .addCase(listWeddingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Load More Weddings Action
    builder
      .addCase(loadMoreWeddingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreWeddingsAsync.fulfilled, (state, action: PayloadAction<WeddingType[]>) => {
        const loadMoreWeddings = action.payload;

        state.loading = false;
        state.weddings = [...state.weddings, ...action.payload];
        state.cursor = loadMoreWeddings.length > 0 ? loadMoreWeddings[loadMoreWeddings.length - 1].id : null;
        state.hasMore = loadMoreWeddings.length === 30;
      })
      .addCase(loadMoreWeddingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Read Wedding Action
    builder
      .addCase(readWeddingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readWeddingAsync.fulfilled, (state, action: PayloadAction<WeddingType>) => {
        state.loading = false;
        state.currentWedding = action.payload;
      })
      .addCase(readWeddingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Remove Wedding Action
    builder
      .addCase(removeWeddingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWeddingAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeWeddingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Wedding Action
    builder
      .addCase(updateWeddingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWeddingAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateWeddingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  updateWeddingForm,
  clearWeddingForm,
  clearWeddings,
  clearCurrentWedding,
  clearError,
  setScrollY,
  clearScrollY,
  setWeddingDate,
  setEventTime,
} = weddingSlice.actions;
export default weddingSlice.reducer;
