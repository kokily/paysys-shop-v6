import type { ChangeEvent, SyntheticEvent } from 'react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { calculateTotalAmount, clearCartForm, updateCartForm } from '../../store/slices/cartSlice';
import { removeOneCartAsync, viewCartAsync } from '../../store/thunks/cartThunks';
import { showToast } from '../data/showToast';
import { addBillAsync } from '../../store/thunks/billThunks';
import { showModal } from '../../store/slices/modalSlice';

export function useCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, loading, error, form } = useAppSelector((state) => state.cart);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(updateCartForm({ [name]: value }));
    },
    [dispatch]
  );

  const onAddBill = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if ([form.title, form.hall].includes('')) {
        showToast.error('빈 칸 없이 입력하세요');
        return;
      }

      try {
        const response = await dispatch(
          addBillAsync({
            title: form.title,
            hall: form.hall,
            etc: form.etc || ' ',
          })
        ).unwrap();
        showToast.success('전표 생성');
        dispatch(clearCartForm());
        navigate(`/front/${response.id}`);
      } catch (error: any) {
        showToast.error(error.message || '전표 생성 실패');
      }
    },
    [form, navigate, dispatch]
  );

  const onRemoveOneCart = useCallback(
    async (id: string, name: string) => {
      if (window.confirm(`${name} 품목을 삭제합니다.`)) {
        try {
          await dispatch(removeOneCartAsync(id)).unwrap();
          await dispatch(viewCartAsync()).unwrap();
          showToast.success('품목 삭제');
        } catch (error: any) {
          showToast.error(error.message || '품목 삭제 실패');
        }
      }
    },
    [dispatch]
  );

  const onModalClick = useCallback(() => {
    dispatch(
      showModal({
        title: '카트 삭제',
        message: '카트의 모든 품목을 삭제합니다.',
        confirmText: '삭제',
        cancelText: '취소',
        actionType: 'REMOVE_CART',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(viewCartAsync());
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      dispatch(calculateTotalAmount());
    }
  }, [cart, dispatch]);

  return {
    cart,
    title: form.title,
    hall: form.hall,
    etc: form.etc,
    totalAmount: form.totalAmount,
    loading,
    error,
    onChange,
    onAddBill,
    onRemoveOneCart,
    onModalClick,
  };
}
