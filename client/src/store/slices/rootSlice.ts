import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: 'root',
  initialState: {},
  reducers: {
    resetStore: () => ({}),
  },
});

export const { resetStore } = rootSlice.actions;
export default rootSlice.reducer;
