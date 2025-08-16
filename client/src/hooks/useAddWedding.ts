import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from "react";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addWeddingAsync, clearForm, clearWeddings, readWeddingAsync, setEventTime, setWeddingDate, updateForm, updateWeddingAsync } from "@/store/slices/weddingSlice";
import { convertWeddingFormToAPI, convertWeddingNumberToString } from "@/utils/convert";
import { showToast } from "@/utils/toast";
import { validateWeddingForm } from "@/utils/validate";

export function useAddWedding() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { form, loading, error, currentWedding } = useAppSelector((state) => state.wedding);
  
  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  }, [dispatch]);

  const onAddWedding = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!validateWeddingForm(form)) {
      showToast.error('빈 칸 없이 입력하세요.');
      return;
    }

    try {
      const apiPayload = convertWeddingFormToAPI(form);

      if (id) {
        await dispatch(updateWeddingAsync({ id, ...apiPayload })).unwrap();
        dispatch(clearForm());
        dispatch(clearWeddings());
        showToast.success(`${id} 웨딩 빌지 수정`);
        navigate('/weddings');
      } else {
        await dispatch(addWeddingAsync(apiPayload)).unwrap();
        showToast.success('웨딩 빌지 추가 성공');
        dispatch(clearForm());
        dispatch(clearWeddings());
      }
    } catch (error: any) {
      showToast.error(error.message || '웨딩 빌지 추가 실패');
    }
  }, [dispatch, form, navigate]);

  const onKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddWedding(e);
    }
  }, [dispatch]);

  const onChangeDate = useCallback((date: Date | null) => {
    dispatch(setWeddingDate(date));
  }, [dispatch]);

  const onChangeTime = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setEventTime(e.target.value));
  }, [dispatch]);

  useEffect(() => {
    const source = async () => {
      await dispatch(readWeddingAsync(id!));

      if (currentWedding) {
        const {
          id,
          created_at,
          updated_at,
          ...formWithoutId
        } = currentWedding;
        const convertWedding = convertWeddingNumberToString(formWithoutId);

        dispatch(updateForm(convertWedding));
      }
    }

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
    onKeyPress,
    onChangeDate,
    onChangeTime,
    isUpdate: !!id,
  };
};