import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  ListMenuParams,
  ListMenuResponse,
  MenuInputs,
  MenuItemType,
  ReadMenuResponse,
} from '../../types/item.types';
import { addMenuAsync, listMenuAsync, readMenuAsync } from '../thunks/menuThunks';

interface MenuState {
  menu: MenuItemType[];
  currentMenu: MenuItemType | null;
  loading: boolean;
  error: string | null;
  params: ListMenuParams;
  menuInputs: MenuInputs;
}

const initialState: MenuState = {
  menu: [],
  currentMenu: null,
  loading: false,
  error: null,
  params: {
    divide: '',
    native: '',
  },
  menuInputs: {
    count: '',
    price: '',
  },
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<ListMenuParams>) => {
      state.params = action.payload;
    },
    clearCurrentMenu: (state) => {
      state.currentMenu = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateMenuInputs: (state, action: PayloadAction<Partial<MenuInputs>>) => {
      state.menuInputs = {
        ...state.menuInputs,
        ...action.payload,
      };
    },
    clearMenuInputs: (state) => {
      state.menuInputs = initialState.menuInputs;
    },
  },
  extraReducers: (builder) => {
    // List Menu Action
    builder
      .addCase(listMenuAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listMenuAsync.fulfilled, (state, action: PayloadAction<ListMenuResponse>) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase(listMenuAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Read Menu Action
    builder
      .addCase(readMenuAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readMenuAsync.fulfilled, (state, action: PayloadAction<ReadMenuResponse>) => {
        state.loading = false;
        state.currentMenu = action.payload;
      })
      .addCase(readMenuAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add Menu Action
    builder
      .addCase(addMenuAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMenuAsync.fulfilled, (state) => {
        state.loading = false;
        state.menuInputs = initialState.menuInputs;
      })
      .addCase(addMenuAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setParams, clearCurrentMenu, clearError, updateMenuInputs, clearMenuInputs } =
  menuSlice.actions;
export default menuSlice.reducer;
