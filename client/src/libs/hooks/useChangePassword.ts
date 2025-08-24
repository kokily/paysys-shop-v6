import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearPasswordForm, updatePasswordForm } from '../../store/slices/userSlice';
import { showToast } from '../data/showToast';
import { changePasswordAsync } from '../../store/thunks/userThunks';

export function useChangePassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { form, loading, error } = useAppSelector((state) => state.user);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(updatePasswordForm({ [name]: value }));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (!form.password) {
        showToast.error('새 비밀번호를 입력하세요');
        return;
      }

      if (form.password.length < 6) {
        showToast.error('비밀번호는 6자 이상이어야 합니다.');
        return;
      }

      if (form.password !== form.confirmPassword) {
        showToast.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        await dispatch(changePasswordAsync({ password: form.password })).unwrap();
        showToast.success('비밀번호가 성공적으로 변경되었습니다.');
        dispatch(clearPasswordForm());
      } catch (error: any) {
        showToast.error(error.message || '비밀번호 변경 실패');
      }
    },
    [dispatch, form, navigate]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onChangePassword(e);
      }
    },
    [dispatch, onChangePassword]
  );

  return {
    form,
    loading,
    error,
    onBack,
    onChange,
    onChangePassword,
    onKeyDown,
  };
}
