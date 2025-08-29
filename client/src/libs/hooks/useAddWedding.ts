import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearWeddingForm,
  clearWeddings,
  setEventTime,
  setWeddingDate,
  updateWeddingForm,
} from '../../store/slices/weddingSlice';
import {
  addWeddingAsync,
  listWeddingsAsync,
  readWeddingAsync,
  updateWeddingAsync,
} from '../../store/thunks/weddingThunks';
import { convertWeddingFormToAPI, convertWeddingNumberToString, validateWeddingForm } from '../data/utils';
import { showToast } from '../data/showToast';

export function useAddWedding() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { form, loading, error, currentWedding } = useAppSelector((state) => state.wedding);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      dispatch(updateWeddingForm({ [name]: value }));
    },
    [dispatch]
  );

  const onAddWedding = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (!validateWeddingForm(form)) {
        showToast.error('빈 칸 없이 입력하세요');
        return;
      }

      try {
        const apiPayload = convertWeddingFormToAPI(form);

        if (!id) {
          await dispatch(addWeddingAsync(apiPayload));
          showToast.success('웨딩 빌지 추가 성공');
          dispatch(clearWeddingForm());
          dispatch(clearWeddings());
          dispatch(listWeddingsAsync({}));
          navigate('/weddings');
        } else {
          await dispatch(updateWeddingAsync({ id, ...apiPayload }));
          showToast.success(`${id} 전표 수정 완료`);
          dispatch(clearWeddingForm());
          dispatch(clearWeddings());
          dispatch(listWeddingsAsync({}));
          navigate('/weddings');
        }
      } catch (error: any) {
        showToast.error(error.message || '웨딩 전표 추가 실패');
      }
    },
    [dispatch, form, navigate]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onAddWedding(e);
      }
    },
    [dispatch]
  );

  const onChangeDate = useCallback(
    (date: Date | null) => {
      dispatch(setWeddingDate(date));
    },
    [dispatch]
  );

  const onChangeTime = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setEventTime(e.target.value));
    },
    [dispatch]
  );

  useEffect(() => {
    const source = async () => {
      await dispatch(readWeddingAsync(id!));

      if (currentWedding) {
        const { id, created_at, updated_at, ...formWithoutId } = currentWedding;
        const convertWedding = convertWeddingNumberToString(formWithoutId);

        dispatch(updateWeddingForm(convertWedding));
      }
    };

    if (id) {
      source();
    }
  }, [id, dispatch]);

  return {
    form,
    loading,
    error,
    onBack,
    onChange,
    onAddWedding,
    onKeyDown,
    onChangeDate,
    onChangeTime,
    isUpdate: !!id,
  };
}
