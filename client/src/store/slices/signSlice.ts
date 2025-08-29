import type { PayloadAction } from '@reduxjs/toolkit';
import type { AddSignPayload, SignModalPayload } from '../../types/sign.types';
import { createSlice } from '@reduxjs/toolkit';
import { addSignAsync, removeSignAsync } from '../thunks/signThunks';

interface SignState {
  form: {
    sex: string;
    image: string;
  };
  signModal: {
    isOpen: boolean;
    type: 'husband' | 'bride' | null;
    title: string;
  };
  removeModal: {
    isOpen: boolean;
    type: 'husband' | 'bride' | null;
  };
  weddingId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SignState = {
  form: {
    sex: 'husband',
    image: '',
  },
  signModal: {
    isOpen: false,
    type: null,
    title: '',
  },
  removeModal: {
    isOpen: false,
    type: null,
  },
  weddingId: null,
  loading: false,
  error: null,
};

const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {
    updateSignForm: (state, action: PayloadAction<Partial<AddSignPayload>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearSignForm: (state) => {
      state.form = {
        sex: '',
        image: '',
      };
    },
    showSignModal: (state, action: PayloadAction<SignModalPayload>) => {
      state.signModal.isOpen = true;
      state.signModal.type = action.payload.type;
      state.signModal.title = action.payload.type === 'husband' ? '신랑 서명' : '신부 서명';
      state.form.sex = action.payload.type;
      state.weddingId = action.payload.weddingId;
    },
    hideSignModal: (state) => {
      state.signModal = initialState.signModal;
    },
    updateSignImage: (state, action: PayloadAction<string>) => {
      state.form.image = action.payload;
    },
    showRemoveSignModal: (state, action: PayloadAction<SignModalPayload>) => {
      // removeModal이 undefined 일 경우
      if (!state.removeModal) {
        state.removeModal = initialState.removeModal;
      }

      state.removeModal.isOpen = true;
      state.removeModal.type = action.payload.type;
      state.weddingId = action.payload.weddingId;
    },
    hideRemoveSignModal: (state) => {
      if (!state.removeModal) {
        state.removeModal = initialState.removeModal;
      }

      state.removeModal.isOpen = false;
      state.removeModal.type = null;
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
        state.signModal = initialState.signModal;
        state.form.image = '';
        state.weddingId = null;
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
  updateSignForm,
  clearSignForm,
  showSignModal,
  hideSignModal,
  updateSignImage,
  hideRemoveSignModal,
  showRemoveSignModal,
} = signSlice.actions;
export default signSlice.reducer;
