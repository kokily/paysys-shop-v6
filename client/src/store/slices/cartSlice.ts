import type { AddBillRequest } from "@/types/bill.types";
import type { CartType } from "@/types/cart.types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addBill } from "@/services/billService";
import { removeCart, removeOneCart, viewCart } from "@/services/cartService";

interface CartState {
  cart: CartType | null;
  loading: boolean;
  error: string | null;
  form: {
    title: string;
    hall: string;
    etc: string;
    totalAmount: number;
  };
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
  form: {
    title: '',
    hall: '',
    etc: '',
    totalAmount: 0,
  },
};

export const viewCartAsync = createAsyncThunk(
  'cart/viewCart',
  async (_, { rejectWithValue }) => {
    try {
      return await viewCart();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '카트 조회 실패');
    }
  }
);

export const removeOneCartAsync = createAsyncThunk(
  'cart/removeOnecart',
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

export const addBillAsync = createAsyncThunk(
  'cart/addBill',
  async ({ title, hall, etc }: AddBillRequest, { rejectWithValue }) => {
    try {
      return await addBill({ title, hall, etc });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '전표 전송 실패');
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<AddBillRequest>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    calculateTotalAmount: (state) => {
      if (state.cart?.items) {
        const total = state.cart.items.reduce((sum, item) => sum + item.amount, 0);
        state.form.totalAmount = total;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewCartAsync.fulfilled, (state, action: PayloadAction<CartType>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(viewCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeOneCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOneCartAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeOneCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartAsync.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        state.form.totalAmount = 0;
      })
      .addCase(removeCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addBillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBillAsync.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        state.form = { title: '', hall: '', etc: '', totalAmount: 0 };
      })
      .addCase(addBillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateForm, clearError, calculateTotalAmount } = cartSlice.actions;
export default cartSlice.reducer;
