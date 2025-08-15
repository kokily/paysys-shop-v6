import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from "react";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItemAsync, clearForm, clearItems, readItemAsync, updateForm, updateItemAsync } from "@/store/slices/itemSlice";
import { showToast } from "@/utils/toast";

export function useAddItem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { form, currentItem } = useAppSelector((state) => state.item);
  const { name, divide, native, unit, price } = form;

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  }, [dispatch]);

  const onAddItem = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([name, unit].includes('')) {
      showToast.error('빈 칸 없이 입력하세요.');
      return;
    }

    try {
      if (id) {
        await dispatch(updateItemAsync({ id, name, divide, native, unit, price })).unwrap();
        dispatch(clearForm());
        dispatch(clearItems());
        showToast.success(`${name}(${divide}) 품목 수정`);
        navigate(-1);
      } else {
        const response = await dispatch(addItemAsync({ name, divide, native, unit, price })).unwrap();
        showToast.success(`${response.name}(${response.divide}) 품목 생성`);
        dispatch(clearForm());
        dispatch(clearItems());
      }      
    } catch (error: any) {
      showToast.error(error.message || '품목 추가 실패');
    }
  }, [name, divide, native, unit, price, dispatch, navigate]);

  const onKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddItem(e);
    }
  }, [dispatch]);

  useEffect(() => {
    const source = async () => {
      await dispatch(readItemAsync(id!));

      if (currentItem) {
        dispatch(updateForm({
          name: currentItem.name,
          divide: currentItem.divide,
          native: currentItem.native,
          unit: currentItem.unit,
          price: currentItem.price.toString(),
        }));
      }
    }

    if (id) {
      source();
    }
  }, [id, dispatch]);

  return {
    form,
    onBack,
    onChange,
    onAddItem,
    onKeyPress,
    isUpdate: !!id,
  }
}