import type { PayloadAction } from "@reduxjs/toolkit";
import type { AddWeddingRequest, ConvertedAddWedding, ConvertedUpdateWedding, UpdateWeddingRequest, WeddingType } from "@/types/wedding.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addWedding, listWeddings, readWedding, removeWedding, updateWedding } from "@/services/weddingService";
import { weddingForm } from "@/data/weddingData";

interface WeddingState {
  weddings: WeddingType[];
  currentWedding: WeddingType | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  cursor: string | null;
  scrollY: number;
  form: AddWeddingRequest;
};

const initialState: WeddingState = {
  weddings: [],
  currentWedding: null,
  loading: false,
  error: null,
  hasMore: true,
  cursor: null,
  scrollY: 0,
  form: weddingForm,
}

export const addWeddingAsync = createAsyncThunk(
  'wedding/addWedding',
  async (payload: ConvertedAddWedding, { rejectWithValue }) => {
    try {
      return await addWedding(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 추가 실패');
    }
  }
);

export const updateWeddingAsync = createAsyncThunk(
  'wedding/updateWedding',
  async (payload: ConvertedUpdateWedding, { rejectWithValue }) => {
    try {
      return await updateWedding(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩빌지 수정 실패');
    }
  }
);

export const listWeddingsAsync = createAsyncThunk(
  'wedding/listWeddings',
  async (params: {
    search?: string;
    cursor?: string;
  }, { rejectWithValue }) => {
    try {
      return await listWeddings(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 리스트 로딩 실패');
    }
  }
);

export const loadMoreWeddingsAsync = createAsyncThunk(
  'wedding/loadMoreWeddings',
  async (params: {
    search?: string;
    cursor?: string;
  }, { rejectWithValue }) => {
    try {
      return await listWeddings(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 리스트 로딩 실패');
    }
  }
);

export const readWeddingAsync = createAsyncThunk(
  'wedding/readWedding',
  async (id: string, { rejectWithValue }) => {
    try {
      return await readWedding(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩 상세보기 실패');
    }
  }
);

export const removeWeddingAsync = createAsyncThunk(
  'wedding/removeWedding',
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeWedding(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '웨딩빌지 삭제 실패');
    }
  }
);

const weddingSlice = createSlice({
  name: 'wedding',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<AddWeddingRequest>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearForm: (state) => {
      state.form = initialState.form;
    },
    clearWeddings: (state) => {
      state.weddings = [];
      state.currentWedding = null;
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
    clearCurrentWedding: (state) => {
      state.currentWedding = null;
    },
    setWeddingDate: (state, action: PayloadAction<Date | null>) => {
      state.form.wedding_at = action.payload ? action.payload.toISOString() : '';
    },
    setEventTime: (state, action: PayloadAction<string>) => {
      state.form.event_at = action.payload;
    },
  },
  extraReducers: (builder) => {
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

    builder
      .addCase(listWeddingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listWeddingsAsync.fulfilled, (state, action: PayloadAction<WeddingType[]>) => {
        state.loading = false;
        state.weddings = action.payload;
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(listWeddingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(loadMoreWeddingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreWeddingsAsync.fulfilled, (state, action: PayloadAction<WeddingType[]>) => {
        state.loading = false;
        state.weddings = [
          ...state.weddings,
          ...action.payload,
        ];
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(loadMoreWeddingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

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
  },
});

export const {
  updateForm,
  clearForm,
  clearWeddings,
  clearError,
  setScrollY,
  clearScrollY,
  clearCurrentWedding,
  setWeddingDate,
  setEventTime,
} = weddingSlice.actions;
export default weddingSlice.reducer;