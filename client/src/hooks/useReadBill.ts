import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearBills, readBillAsync, removeBillAsync, restoreBillAsync } from "@/store/slices/billSlice";
import { hideModal, showModal } from "@/store/slices/modalSlice";
import { removeReserveAsync } from "@/store/slices/reserveSlice";
import { showToast } from "@/utils/toast";

export function useReadBill() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentBill, loading, error } = useAppSelector((state) => state.bill);
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams<{ id: string }>();

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onRestore = useCallback(async () => {
    if (window.confirm('※ 주의!! 빌지는 삭제되고 전표확인으로 돌아갑니다.')) {
      try {
        await dispatch(restoreBillAsync(id!)).unwrap();
        navigate('/cart');
      } catch (error: any) {
        showToast.error(error.message || '에러 발생!');
      }
    }
  }, [dispatch, id, navigate]);

  const onReservePage = useCallback(() => {
    navigate(`/front/update/${id}`);
  }, [navigate, id]);

  const onRemoveReserve = useCallback(async () => {
    try {
      await dispatch(removeReserveAsync(id!)).unwrap();
      dispatch(readBillAsync(id!));
    } catch (error: any) {
      showToast.error(error.message || '에러 발생!');
    }
  }, [dispatch, id]);

  const onRemoveBill = useCallback(async () => {
    try {
      await dispatch(removeBillAsync(id!)).unwrap();
      dispatch(clearBills());
      dispatch(hideModal());
      navigate('/fronts');
    } catch (error: any) {
      showToast.error(error.message || '에러 발생!');
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(readBillAsync(id));
    }
  }, [dispatch, id]);

  const onModalClick = useCallback(() => {
    dispatch(showModal({
      title: '전표 삭제',
      message: '정말 전표를 삭제하시나요?',
      confirmText: '삭제',
      cancelText: '취소',
      actionType: 'REMOVE_BILL',
      onConfirm: onRemoveBill,
    }));
  }, [dispatch, onRemoveBill]);

  return {
    bill: currentBill,
    user,
    loading,
    error,
    onBack,
    onRestore,
    onReservePage,
    onRemoveReserve,
    onModalClick,
  };
};