import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCurrentBill, clearReserveForm, updateReserveForm } from '../../store/slices/billSlice';
import { showToast } from '../data/showToast';
import { addReserveAsync } from '../../store/thunks/billThunks';

export function useAddReserve() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { reserve, error, loading } = useAppSelector((state) => state.bill);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      dispatch(updateReserveForm(parseInt(value)));
    },
    [dispatch]
  );

  const onAddReserve = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      try {
        await dispatch(
          addReserveAsync({
            bill_id: id!,
            reserve,
          })
        );
        dispatch(clearCurrentBill());
        dispatch(clearReserveForm());
        showToast.success('예약금 추가');
        navigate(-1);
      } catch (error: any) {
        showToast.error(error.message || '예약금 추가 실패');
      }
    },
    [dispatch]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onAddReserve(e);
      }
    },
    [onAddReserve]
  );

  return {
    reserve,
    error,
    loading,
    onBack,
    onChange,
    onAddReserve,
    onKeyDown,
  };
}
