import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuItemType } from "@/types/menu.types";
import type { AddCartRequest, CartInputs } from "@/types/cart.types";
import { listMenu, readMenu } from "@/services/menuService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCart } from "@/services/cartService";

export interface FilterType {
  divide: string;
  native: string;
}

interface MenuState {
  menuList: MenuItemType[];
  currentMenu: MenuItemType | null;
  loading: boolean;
  error: string | null;
  filters: FilterType;
  cartInputs: CartInputs;
}

const initialState: MenuState = {
  menuList: [],
  currentMenu: null,
  loading: false,
  error: null,
  filters: {
    divide: '',
    native: '',
  },
  cartInputs: {
    count: '',
    price: '',
  }
};

export const listMenuAsync = createAsyncThunk(
  'menu/list',
  async ({ divide, native }: FilterType, { rejectWithValue }) => {
    try {
      return await listMenu({ divide, native });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '메뉴 리스트를 가져올 수 없습니다.');
    }
  }
);

export const readMenuAsync = createAsyncThunk(
  'menu/read',
  async (id: string, { rejectWithValue }) => {
    try {
      return await readMenu(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '메뉴 상세 정보를 조회할 수 없습니다.');
    }
  }
);

export const addCartAsync = createAsyncThunk(
  'menu/addCart',
  async ({ item_id, count, price }: AddCartRequest, { rejectWithValue }) => {
    try {
      return await addCart({ item_id, count, price });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '카트 추가에 실패했습니다.');
    }
  }
)

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterType>) => {
      state.filters = action.payload;
    },
    clearCurrentMenu: (state) => {
      state.currentMenu = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateCartInputs: (state, action: PayloadAction<Partial<CartInputs>>) => {
      state.cartInputs = {
        ...state.cartInputs,
        ...action.payload,
      };
    },
    clearCartInputs: (state) => {
      state.cartInputs = { count: '', price: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listMenuAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listMenuAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.menuList = action.payload;
      })
      .addCase(listMenuAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(readMenuAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readMenuAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMenu = action.payload;
      })
      .addCase(readMenuAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartAsync.fulfilled, (state) => {
        state.loading = false;
        state.cartInputs = { count: '', price: '' };
      })
      .addCase(addCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearCurrentMenu,
  clearError,
  updateCartInputs,
  clearCartInputs
} = menuSlice.actions;
export default menuSlice.reducer;