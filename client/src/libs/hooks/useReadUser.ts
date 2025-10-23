import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../data/showToast';
import { readUserAsync, removeUserAsync, setAdminAsync } from '../../store/thunks/userThunks';
import { hideModal, showModal } from '../../store/slices/modalSlice';
import { clearUsers } from '../../store/slices/userSlice';

export function useReadUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.user);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSetAdmin = useCallback(async () => {
    if (!currentUser) return;

    try {
      await dispatch(
        setAdminAsync({
          id: currentUser.id,
          isAdmin: !currentUser.admin,
        })
      ).unwrap();
      dispatch(readUserAsync(id!));
      showToast.success('관리자 권한이 변경되었습니다.');
    } catch (error: any) {
      showToast.error(error.message || '관리자 권한 변경 실패');
    }
  }, [dispatch, currentUser, id]);

  const onRemoveUser = useCallback(async () => {
    try {
      await dispatch(removeUserAsync(id!)).unwrap();
      dispatch(clearUsers());
      dispatch(hideModal());
      navigate('/users');
      showToast.success('사용자 삭제 완료');
    } catch (error: any) {
      showToast.error(error.message || '에러 발생');
    }
  }, [dispatch, id, navigate]);

  const onModalClick = useCallback(() => {
    if (currentUser) {
      dispatch(
        showModal({
          title: '사용자 삭제',
          message: `${currentUser.username} 님을 삭제합니다.`,
          confirmText: '삭제',
          cancelText: '취소',
          actionType: 'REMOTE_USER',
          handleConfirm: onRemoveUser,
        })
      );
    }
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
}
