import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../data/showToast';
import { readItemAsync, removeItemAsync } from '../../store/thunks/itemThunks';
import { clearItems } from '../../store/slices/itemSlice';
import { hideModal, showModal } from '../../store/slices/modalSlice';

export function useReadItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentItem, loading, error } = useAppSelector((state) => state.item);
  const { id } = useParams<{ id: string }>();

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onUpdateItemPage = useCallback(() => {
    navigate(`/item/update/${id}`);
  }, [navigate]);

  const onRemoveItem = useCallback(async () => {
    try {
      await dispatch(removeItemAsync(id!)).unwrap();
      dispatch(clearItems());
      dispatch(hideModal());
      navigate('/items');
      showToast.success('품목 삭제 완료');
    } catch (error: any) {
      showToast.error(error.message || '에러 발생');
    }
  }, [dispatch, id, navigate]);

  const onModalClick = useCallback(() => {
    dispatch(
      showModal({
        title: '품목 삭제',
        message: '이 품목을 삭제합니다.',
        confirmText: '삭제',
        cancelText: '취소',
        actionType: 'REMOVE_ITEM',
        handleConfirm: onRemoveItem,
      })
    );
  }, [dispatch, onRemoveItem]);

  useEffect(() => {
    if (id) {
      dispatch(readItemAsync(id));
    }
  }, [dispatch, id]);

  return {
    item: currentItem,
    loading,
    error,
    onBack,
    onUpdateItemPage,
    onModalClick,
  };
}
