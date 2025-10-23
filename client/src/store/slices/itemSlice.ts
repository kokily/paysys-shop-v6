import type { PayloadAction } from '@reduxjs/toolkit';
import type { AddItemRequest, ItemDivideType, ItemType, NativeLabel } from '../../types/item.types';
import { createSlice } from '@reduxjs/toolkit';
import {
  addItemAsync,
  listItemsAsync,
  loadMoreItemsAsync,
  readItemAsync,
  removeItemAsync,
  updateItemAsync,
} from '../thunks/itemThunks';

interface ItemState {
  items: ItemType[];
  currentItem: ItemType | null;
  loading: boolean;
  error: string | null;
  name: string;
  divide: string;
  native: string;
  cursor: string | null;
  hasMore: boolean;
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
  name: '',
  divide: '',
  native: '',
  cursor: null,
  hasMore: true,
  scrollY: 0,
  form: {
    name: '',
    divide: '식사(뷔페)',
    native: '회원',
    unit: '',
    price: '',
  },
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDivide: (state, action: PayloadAction<ItemDivideType>) => {
      state.divide = action.payload;
    },
    setNative: (state, action: PayloadAction<NativeLabel>) => {
      state.native = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
      state.cursor = null;
      state.hasMore = true;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
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
    updateItemForm: (state, action: PayloadAction<Partial<AddItemRequest>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearItemForm: (state) => {
      state.form = initialState.form;
    },
  },
  extraReducers: (builder) => {
    // List Items Action
    builder
      .addCase(listItemsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listItemsAsync.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
        const items = action.payload;

        state.loading = false;
        state.items = items;
        state.cursor = items.length > 0 ? items[items.length - 1].id : null;
        state.hasMore = items.length === 30;
      })
      .addCase(listItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Load More Items Action
    builder
      .addCase(loadMoreItemsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreItemsAsync.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
        const loadMoreItems = action.payload;

        state.loading = false;
        state.items = [...state.items, ...loadMoreItems];
        state.cursor = loadMoreItems.length > 0 ? loadMoreItems[loadMoreItems.length - 1].id : null;
        state.hasMore = loadMoreItems.length === 30;
      })
      .addCase(loadMoreItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Read Item Action
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

    // Add Item Action
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

    // Remove Item Action
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

    // Update Item Action
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
  setName,
  setDivide,
  setNative,
  clearItems,
  clearCurrentItem,
  updateItemForm,
  clearItemForm,
  clearError,
  setScrollY,
  clearScrollY,
} = itemSlice.actions;
export default itemSlice.reducer;
