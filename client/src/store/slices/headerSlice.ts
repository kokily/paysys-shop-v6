import { createSlice } from '@reduxjs/toolkit';

interface HeaderState {
  menuOpen: boolean;
}

const initialState: HeaderState = {
  menuOpen: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = headerSlice.actions;
export default headerSlice.reducer;
