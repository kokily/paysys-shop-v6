import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideModal, showModal } from "@/store/slices/modalSlice";
import { clearWeddings, readWeddingAsync, removeWeddingAsync } from "@/store/slices/weddingSlice";
import { showToast } from "@/utils/toast";

export function useReadWedding() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentWedding, loading, error } = useAppSelector((state) => state.wedding);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onUpdateWeddingPage = useCallback(() => {
    navigate(`/weddings/update/${id}`);
  }, [navigate]);

  const onRemoveWedding = useCallback(async () => {
    try {
      await dispatch(removeWeddingAsync(id!)).unwrap();
      dispatch(clearWeddings());
      dispatch(hideModal());
      navigate('/weddings');
      showToast.success('웨딩빌지 삭제 완료');
    } catch (error: any) {
      showToast.error(error.message || '웨딩빌지 삭제 실패');
    }
  }, [dispatch]);

  const onModalClick = useCallback(() => {
    dispatch(showModal({
      title: '웨딩빌지 삭제',
      message: '정말 이 빌지를 삭제하시나요?',
      confirmText: '삭제',
      cancelText: '취소',
      actionType: 'REMOVE_WEDDING',
      onConfirm: onRemoveWedding,
    }));
  }, [dispatch, onRemoveWedding]);

  useEffect(() => {
    if (id) {
      dispatch(readWeddingAsync(id));
    }
  }, [dispatch, id]);

  return {
    wedding: currentWedding,
    loading,
    error,
    onBack,
    onUpdateWeddingPage,
    onModalClick,
  }
}