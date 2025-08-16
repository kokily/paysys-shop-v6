import { addSign, removeSign } from "@/services/signService";
import type { AddSignRequest } from "@/types/sign.types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SignState {
  form: {
    sex: string;
    image: string;
  };
  loading: boolean;
  error: string | null;  
};

const initialState: SignState = {
  form: {
    sex: 'husband',
    image: '',
  },
  loading: false,
  error: null,
};

export const addSignAsync = createAsyncThunk(
  'sign/addSign',
  async (payload: AddSignRequest, { rejectWithValue }) => {
    try {
      return await addSign(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '서명 추가 실패');
    }
  },
);

export const removeSignAsync = createAsyncThunk(
  'sign/removeSign',
  async (id: string, { rejectWithValue }) => {
    try {
      return await removeSign(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '서명 삭제 실패');
    }
  }
);

const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    updateform: (state, action: PayloadAction<Partial<AddSignRequest>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearForm: (state) => {
      state.form = {
        sex: '',
        image: '',
      };
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSignAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSignAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addSignAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeSignAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSignAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeSignAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  updateform,
  clearForm,
} = signSlice.actions;
export default signSlice.reducer;