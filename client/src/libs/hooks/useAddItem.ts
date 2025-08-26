import type { ChangeEvent, SyntheticEvent, KeyboardEvent } from 'react';
import type { ItemDivideType, NativeLabel } from '../../types/item.types';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearItemForm, clearItems, updateItemForm } from '../../store/slices/itemSlice';
import { showToast } from '../data/showToast';
import { addItemAsync, readItemAsync, updateItemAsync } from '../../store/thunks/itemThunks';

export function useAddItem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { form, currentItem } = useAppSelector((state) => state.item);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      dispatch(updateItemForm({ [name]: value }));
    },
    [dispatch]
  );

  const onAddItem = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if ([form.name, form.unit].includes('')) {
        showToast.error('빈 칸 없이 입력하세요');
        return;
      }

      try {
        if (!id) {
          await dispatch(
            addItemAsync({
              ...form,
              price: parseInt(form.price),
            })
          ).unwrap();
          showToast.success(`${form.name}(${form.divide}) 품목 생성`);
          dispatch(clearItemForm());
          dispatch(clearItems());
        } else {
          await dispatch(
            updateItemAsync({
              id,
              ...form,
              price: parseInt(form.price),
            })
          );
          showToast.success(`${form.name}(${form.divide}) 품목 수정`);
          dispatch(clearItemForm());
          dispatch(clearItems());
        }
      } catch (error: any) {
        showToast.error(error.message || '품목 추가 실패');
      }
    },
    [dispatch, navigate, form]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onAddItem(e);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const source = async () => {
      await dispatch(readItemAsync(id!));

      if (currentItem) {
        dispatch(
          updateItemForm({
            name: currentItem.name,
            divide: currentItem.divide as ItemDivideType,
            native: currentItem.native as NativeLabel,
            unit: currentItem.unit,
            price: currentItem.price.toString(),
          })
        );
      }
    };

    if (id) {
      source();
    }
  }, [id, dispatch]);

  return {
    form,
    onBack,
    onChange,
    onAddItem,
    onKeyDown,
    isUpdate: !!id,
  };
}
