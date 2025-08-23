import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateMenuInputs } from '../../store/slices/menuSlice';
import { addMenuAsync, readMenuAsync } from '../../store/thunks/menuThunks';
import { showToast } from '../data/showToast';

export function useReadMenu() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentMenu, loading, error, menuInputs } = useAppSelector((state) => state.menu);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(updateMenuInputs({ [name]: value }));
    },
    [dispatch]
  );

  const onAddMenu = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      const countNum = parseInt(menuInputs.count) || 0;
      const priceNum = parseInt(menuInputs.price) || 0;

      if (countNum < 1 || priceNum < 1) {
        showToast.warning('단가 또는 수량을 입력하세요');
        return;
      }

      try {
        await dispatch(
          addMenuAsync({
            item_id: id!,
            count: countNum,
            price: priceNum,
          })
        );
      } catch (error: any) {
        showToast.error(error.message || '카트 추가 실패');
      }
    },
    [dispatch, id, menuInputs, navigate, dispatch]
  );

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onAddMenu(e);
      }
    },
    [onAddMenu]
  );

  useEffect(() => {
    if (id) {
      dispatch(readMenuAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentMenu) {
      if (currentMenu?.price !== 0) {
        dispatch(updateMenuInputs({ price: currentMenu.price.toString() }));
      } else {
        dispatch(updateMenuInputs({ price: '' }));
      }
    }
  }, [currentMenu, dispatch]);

  return {
    menu: currentMenu,
    count: menuInputs.count,
    price: menuInputs.price,
    loading,
    error,
    onBack,
    onChange,
    onAddMenu,
    onKeyPress,
  };
}
