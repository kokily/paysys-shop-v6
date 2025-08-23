import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setParams } from '../../store/slices/menuSlice';
import { listMenuAsync } from '../../store/thunks/menuThunks';

export function useListMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { menu, loading, error } = useAppSelector((state) => state.menu);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onReadMenu = useCallback(
    (id: string) => {
      navigate(`/menu/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const divide = searchParams.get('divide') || '';
    const native = searchParams.get('native') || '';

    if (divide && native) {
      dispatch(setParams({ divide, native }));
      dispatch(listMenuAsync({ divide, native }));
    }
  }, [location.search, dispatch]);

  return {
    menu,
    loading,
    error,
    onBack,
    onReadMenu,
  };
}
