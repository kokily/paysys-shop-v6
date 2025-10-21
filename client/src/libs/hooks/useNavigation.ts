import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeMenu } from '../../store/slices/headerSlice';
import { logoutAsync } from '../../store/thunks/authThunks';
import { showToast } from '../data/showToast';

export function useNavigation() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { menuOpen } = useAppSelector((state) => state.header);

  const onCloseMenu = useCallback(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      showToast.success('로그아웃');
    } catch (error) {
      showToast.error('로그아웃 실패');
    }
  }, [dispatch]);

  return {
    user,
    menuOpen,
    onCloseMenu,
    onLogout,
  };
}
