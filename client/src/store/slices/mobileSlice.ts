import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface MobileState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  breakpoint: number;
  includeTablet: boolean;
}

const initialState: MobileState = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
  screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
  breakpoint: 768,
  includeTablet: false,
};

const mobileSlice = createSlice({
  name: 'mobile',
  initialState,
  reducers: {
    setScreenSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
      const { width, height } = action.payload;
      state.screenWidth = width;
      state.screenHeight = height;
      state.isMobile = width <= state.breakpoint;
      state.isTablet = width > state.breakpoint && width <= 1024;
      state.isDesktop = width > 1024;
    },
    setBreakpoint: (state, action: PayloadAction<number>) => {
      state.breakpoint = action.payload;
      // 현재 화면으로 다시 계산
      state.isMobile = state.screenWidth <= state.breakpoint;
      state.isTablet = state.screenWidth > state.breakpoint && state.screenWidth <= 1024;
      state.isDesktop = state.screenWidth > 1024;
    },
    setIncludeTablet: (state, action: PayloadAction<boolean>) => {
      state.includeTablet = action.payload;
    },
  },
});

export const { setScreenSize, setBreakpoint, setIncludeTablet } = mobileSlice.actions;
export default mobileSlice.reducer;
