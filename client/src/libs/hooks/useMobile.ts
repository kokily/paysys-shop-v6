import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setBreakpoint, setIncludeTablet, setScreenSize } from '../../store/slices/mobileSlice';

interface MobileConfig {
  breakpoint?: number;
  includeTablet?: boolean;
}

export function useMobile(config: MobileConfig = {}) {
  const dispatch = useAppDispatch();
  const { isMobile, isTablet, isDesktop, screenWidth, screenHeight, breakpoint, includeTablet } =
    useAppSelector((state) => state.mobile);

  const checkScreenSize = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    dispatch(setScreenSize({ width, height }));
  }, [dispatch]);

  useEffect(() => {
    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스터
    const handleResize = () => {
      checkScreenSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkScreenSize]);

  useEffect(() => {
    // 설정 적용
    if (config.breakpoint && config.breakpoint !== breakpoint) {
      dispatch(setBreakpoint(config.breakpoint));
    }

    if (config.includeTablet !== undefined && config.includeTablet !== includeTablet) {
      dispatch(setIncludeTablet(config.includeTablet));
    }
  }, [config, breakpoint, includeTablet, dispatch]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet: isMobile || (includeTablet && isTablet),
    screenWidth,
    screenHeight,
    breakpoint,
    includeTablet,
  };
}

export function useMobileSimple(breakpoint: number = 768): boolean {
  const { isMobile } = useMobile({ breakpoint });
  return isMobile;
}
