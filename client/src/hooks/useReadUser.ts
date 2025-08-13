import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { readUserAsync, removeUserAsync, setAdminAsync } from "@/store/slices/userSlice";
import { showToast } from "@/utils/toast";
import { showModal } from "@/store/slices/modalSlice";

export function useReadUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.user);
  const { id } = useParams<{ id: string }>();

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSetAdmin = useCallback(async () => {
    if (!currentUser) return;

    try {
      await dispatch(setAdminAsync({
        id: currentUser.id,
        isAdmin: !currentUser.admin,
      })).unwrap();
      dispatch(readUserAsync(id!));
      showToast.success('관리자 권한이 변경되었습니다.');
    } catch (error: any) {
      showToast.error(error.message || '관리자 권한 변경 실패');
    }
  }, [dispatch, currentUser, id]);

  const onRemoveUser = useCallback(async () => {
    try {
      await dispatch(removeUserAsync(id!)).unwrap();
      navigate('/users');
      showToast.success('사용자가 삭제되었습니다.');
    } catch (error: any) {
      showToast.error(error.message || '사용자 삭제 실패');
    }
  }, [dispatch, id, navigate]);

  const onModalClick = useCallback(() => {
    dispatch(showModal({
      title: '사용자 삭제',
      message: '정말 이 사용자를 삭제하시나요?',
      confirmText: '삭제',
      cancelText: '취소',
      actionType: 'REMOVE_USER',
      onConfirm: () => onRemoveUser(),
    }));
  }, [dispatch, onRemoveUser]);

  useEffect(() => {
    if (id) {
      dispatch(readUserAsync(id));
    }
  }, [dispatch, id]);

  return {
    user: currentUser,
    loading,
    error,
    onBack,
    onSetAdmin,
    onModalClick,
  };
};