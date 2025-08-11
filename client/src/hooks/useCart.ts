import type { ChangeEvent, SyntheticEvent } from "react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBillAsync, calculateTotalAmount, removeCartAsync, removeOneCartAsync, viewCartAsync } from "@/store/slices/cartSlice";
import { updateForm } from "@/store/slices/authSlice";
import { showToast } from "@/utils/toast";
import { showModal } from "@/store/slices/modalSlice";

export function useCart() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, loading, error, form } = useAppSelector((state) => state.cart);
  const { title, hall, etc, totalAmount } = form;

  useEffect(() => {
    dispatch(viewCartAsync());
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      dispatch(calculateTotalAmount());
    }
  }, [cart, dispatch]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  }, [dispatch]);

  const onAddBill = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([title, hall].includes('')) {
      showToast.error('빈 칸 없이 입력하세요!');
      return;
    }

    try {
      const response = await dispatch(addBillAsync({ title, hall, etc })).unwrap();
      showToast.success('전표 생성');
      navigate(`/fronts/${response.id}`);
    } catch (error: any) {
      showToast.error(error.message || '전표 생성 실패');
    }
  }, [title, hall, etc, navigate, dispatch]);

  const onRemoveOneCart = useCallback(async (id: string, name: string) => {
    if (window.confirm(`${name} 품목을 삭제합니다.`)) {
      try {
        await dispatch(removeOneCartAsync(id)).unwrap();
        await dispatch(viewCartAsync()).unwrap();
        showToast.success('품목 삭제!');
      } catch (error: any) {
        showToast.error(error.message || '품목 삭제 실패');
      }
    }
  }, [dispatch]);

  const onModalClick = useCallback(() => {
    dispatch(showModal({
      title: '카트 삭제',
      message: '카트의 모든 아이템을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      actionType: 'REMOVE_CART',
    }));
  }, [dispatch]);

  return {
    cart,
    title,
    hall,
    etc,
    totalAmount,
    loading,
    error,
    onChange,
    onAddBill,
    onRemoveOneCart,
    onModalClick,
  };
};