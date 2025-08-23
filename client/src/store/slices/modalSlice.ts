import type { PayloadAction } from '@reduxjs/toolkit';
import type { ModalState } from '../../types/modal.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ModalState = {
  isOpen: false,
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  actionType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.confirmText = action.payload.confirmText;
      state.cancelText = action.payload.cancelText;
      state.actionType = action.payload.actionType;
      state.handleConfirm = action.payload.handleConfirm;
    },
    hideModal: (state) => {
      state.isOpen = false;
      state.actionType = null;
      state.handleConfirm = undefined;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
