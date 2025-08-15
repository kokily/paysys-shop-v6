import type { PayloadAction } from "@reduxjs/toolkit";
import type { AddItemRequest, ItemDivideType, ItemType, UpdateItemRequest } from "@/types/item.types";
import { addItem, listItems, readItem, removeItem, updateItem } from "@/services/itemService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { NativeLabel } from "@/types/menu.types";

interface ItemState {
  items: ItemType[];
  currentItem: ItemType | null;
  loading: boolean;
  error: string | null;
  search: string;
  divide: string;
  native: string;
  hasMore: boolean;
  cursor: string | null;
  scrollY: number;
  form: {
    name: string;
    divide: ItemDivideType;
    native: NativeLabel;
    unit: string;
    price: string;
  };
}

const initialState: ItemState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
  search: '',
  divide: '',
  native: '',
  hasMore: true,
  cursor: null,
  scrollY: 0,
  form: {
    name: '',
    divide: '식사(뷔페)',
    native: '회원',
    unit: '',
    price: '',
  },
};

export const addItemAsync = createAsyncThunk(
  'item/addItem',
  async (payload: AddItemRequest, { rejectWithValue }) => {
    try {
      return await addItem(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 추가 실패');
    }
  }
)

export const listItemsAsync = createAsyncThunk(
  'item/listItems',
  async (params: {
    divide?: string;
    native?: string;
    name?: string;
    cursor?: string;
  }, { rejectWithValue }) => {
    try {
      return await listItems(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 리스트 조회 실패');
    }
  }
);

export const loadMoreItemsAsync = createAsyncThunk(
  'item/loadMoreItems',
  async (params: {
    divide?: string;
    native?: string;
    name?: string;
    cursor?: string;
  }, { rejectWithValue }) => {
    try {
      return await listItems(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 리스트 조회 실패');
    }
  }
);

export const readItemAsync = createAsyncThunk(
  'item/readItem',
  async (id: string, { rejectWithValue }) => {
    try {
      return await readItem(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 상세보기 실패');
    }
  }
);

export const removeItemAsync = createAsyncThunk(
  'item/removeItem',
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeItem(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 삭제 실패');
    }
  }
);

export const updateItemAsync = createAsyncThunk(
  'item/updateItem',
  async (payload: UpdateItemRequest, { rejectWithValue }) => {
    try {
      return await updateItem(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '품목 수정 실패');
    }
  }
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDivide: (state, action: PayloadAction<string>) => {
      state.divide = action.payload;
    },
    setNative: (state, action: PayloadAction<string>) => {
      state.native = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
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
    clearCurrentUser: (state) => {
      state.currentItem = null;
    },
    updateForm: (state, action: PayloadAction<Partial<AddItemRequest>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
    clearForm: (state) => {
      state.form = {
        name: '',
        divide: '식사(뷔페)',
        native: '회원',
        unit: '',
        price: '',
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(listItemsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listItemsAsync.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(listItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(loadMoreItemsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreItemsAsync.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(loadMoreItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(readItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readItemAsync.fulfilled, (state, action: PayloadAction<ItemType>) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(readItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateItemAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearch,
  setDivide,
  setNative,
  clearItems,
  clearError,
  setScrollY,
  clearScrollY,
  clearCurrentUser,
  updateForm,
  clearForm,
} = itemSlice.actions;
export default itemSlice.reducer;