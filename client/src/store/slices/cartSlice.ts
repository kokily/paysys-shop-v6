import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartType } from '../../types/cart.types';
import type { AddBillPayload } from '../../types/bill.types';
import { createSlice } from '@reduxjs/toolkit';
import { removeCartAsync, removeOneCartAsync, viewCartAsync } from '../thunks/cartThunks';
import { addBillAsync } from '../thunks/billThunks';

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateCartForm: (state, action: PayloadAction<Partial<AddBillPayload>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearCartForm: (state) => {
      state.form = initialState.form;
    },
    calculateTotalAmount: (state) => {
      if (state.cart?.items) {
        const total = state.cart.items.reduce((sum, item) => sum + item.amount, 0);
        state.form.totalAmount = total;
      }
    },
  },
  extraReducers: (builder) => {
    // View Cart Action
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

    // Remove One Item Cart Action
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

    // Remove Cart Action
    builder
      .addCase(removeCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartAsync.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        state.form = initialState.form;
      })
      .addCase(removeCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add Bill Action
    builder
      .addCase(addBillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBillAsync.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        state.form = initialState.form;
      })
      .addCase(addBillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateCartForm, clearCartForm, calculateTotalAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
