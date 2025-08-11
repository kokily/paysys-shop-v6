import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menu } from "@/data/menuData";
import { getNativeLabel, isValidNativeType } from "@/utils/menuUtils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentNative, setError, setLoading } from "@/store/slices/nativeSlice";

export function useNative() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentNative, loading, error } = useAppSelector((state) => state.native);
  
  useEffect(() => {
    const pathSegment = location.pathname.substring(1);

    if (isValidNativeType(pathSegment)) {
      dispatch(setCurrentNative(pathSegment));
    }
  }, [location.pathname, dispatch]);

  const onMenu = useCallback(async (divide: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const native = getNativeLabel(currentNative);
      const encodedDivide = encodeURIComponent(divide);

      navigate(`/menu?native=${encodeURIComponent(native)}&divide=${encodedDivide}`);
    } catch (error) {
      dispatch(setError('메뉴 이동 중 오류'));
      console.error('Menu navigation error:' , error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentNative, navigate, dispatch]);

  return {
    menu,
    native: currentNative,
    onMenu,
    loading,
    error,
  };
};
