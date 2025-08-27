import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../data/showToast';
import { readUserAsync, setAdminAsync } from '../../store/thunks/userThunks';

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

  const onRemoveUser = useCallback(async () => {}, [dispatch, id, navigate]);

  const onModalClick = useCallback(() => {}, [dispatch, onRemoveUser]);

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
