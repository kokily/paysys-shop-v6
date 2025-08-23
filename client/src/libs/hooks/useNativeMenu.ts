import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentNative, setError, setLoading } from '../../store/slices/nativeSlice';
import { getNativeLabel, isValidNativeType } from '../data/utils';
import { menu } from '../data/sourceFiles';

export function useNativeMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentNative, loading, error } = useAppSelector((state) => state.native);

  const onListMenu = useCallback(
    (divide: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const native = getNativeLabel(currentNative);
        const encodedNative = encodeURIComponent(native);
        const encodedDivide = encodeURIComponent(divide);

        navigate(`/menu?native=${encodedNative}&divide=${encodedDivide}`);
      } catch (error) {
        dispatch(setError('메뉴 이동 중 오류'));
        console.error('메뉴 네비게이션 에러: ', error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [currentNative, navigate, dispatch]
  );

  useEffect(() => {
    const pathSegment = location.pathname.substring(1);

    if (isValidNativeType(pathSegment)) {
      dispatch(setCurrentNative(pathSegment));
    }
  }, [location.pathname, dispatch]);

  return {
    menu,
    native: currentNative,
    onListMenu,
    loading,
    error,
  };
}
