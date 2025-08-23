import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useOutsideClick } from './useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeMenu, toggleMenu } from '../../store/slices/headerSlice';

export function useHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const link = location.pathname.substring(1);

  const menuRef = useOutsideClick<HTMLDivElement>(() => {
    dispatch(closeMenu());
  });

  const onToggleMenu = useCallback(() => {
    dispatch(toggleMenu());
  }, [dispatch]);

  return {
    user,
    link,
    menuRef,
    onToggleMenu,
  };
}
