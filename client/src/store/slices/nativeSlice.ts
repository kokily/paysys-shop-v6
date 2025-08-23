import type { PayloadAction } from '@reduxjs/toolkit';
import type { NativeType } from '../../types/item.types';
import { createSlice } from '@reduxjs/toolkit';

interface NativeState {
  currentNative: NativeType;
  loading: boolean;
  error: string | null;
}

const initialState: NativeState = {
  currentNative: 'member',
  loading: false,
  error: null,
};

const nativeSlice = createSlice({
  name: 'native',
  initialState,
  reducers: {
    setCurrentNative: (state, action: PayloadAction<NativeType>) => {
      state.currentNative = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentNative, setLoading, setError } = nativeSlice.actions;
export default nativeSlice.reducer;
