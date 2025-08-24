import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  readBillAsync,
  removeBillAsync,
  removeReserveAsync,
  restoreBillAsync,
} from '../../store/thunks/billThunks';
import { clearBills, clearReserveForm } from '../../store/slices/billSlice';
import { hideModal, showModal } from '../../store/slices/modalSlice';
import { showToast } from '../data/showToast';

export function useReadBill() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentBill, loading, error } = useAppSelector((state) => state.bill);
  const { user } = useAppSelector((state) => state.auth);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onRemoveBill = useCallback(async () => {
    try {
      await dispatch(removeBillAsync(id!)).unwrap();
      dispatch(clearBills());
      dispatch(hideModal());
      showToast.success('전표 삭제 완료!');
      navigate('/fronts');
    } catch (error: any) {
      showToast.error(error.message || '전표삭제 에러!');
    }
  }, [dispatch, id, navigate]);

  const onRestore = useCallback(async () => {
    if (window.confirm('※ 주의!! 빌지는 삭제되고 전표확인으로 돌아갑니다.')) {
      try {
        await dispatch(restoreBillAsync(id!)).unwrap();
        showToast.success('전표 복원 완료!');
        navigate('/cart');
      } catch (error: any) {
        showToast.error(error.message || '전표 복원 에러!');
      }
    }
  }, [dispatch, id, navigate]);

  const onRemoveReserve = useCallback(async () => {
    try {
      await dispatch(removeReserveAsync(id!)).unwrap();
      dispatch(readBillAsync(id!));
      dispatch(clearReserveForm());
      showToast.success('예약금 삭제');
    } catch (error: any) {
      showToast.error(error.message || '예약금 삭제 에러!');
    }
  }, [dispatch, id]);

  const onReservePage = useCallback(() => {
    navigate(`/front/update/${id}`);
  }, [navigate, id]);

  const onModalClick = useCallback(() => {
    dispatch(
      showModal({
        title: '전표 삭제',
        message: '전표가 삭제됩니다!',
        confirmText: '삭제',
        cancelText: '취소',
        actionType: 'REMOVE_BILL',
        handleConfirm: onRemoveBill,
      })
    );
  }, [dispatch, onRemoveBill]);

  useEffect(() => {
    if (id) {
      dispatch(readBillAsync(id));
    }
  }, [dispatch, id]);

  return {
    bill: currentBill,
    user,
    loading,
    error,
    onBack,
    onModalClick,
    onRestore,
    onRemoveReserve,
    onReservePage,
  };
}
