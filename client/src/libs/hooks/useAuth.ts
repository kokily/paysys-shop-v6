import type { ChangeEvent, SyntheticEvent } from 'react';
import { useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateAuthForm } from '../../store/slices/authSlice';
import { showToast } from '../data/showToast';
import { loginAsync } from '../../store/thunks/authThunks';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { form, loading, error } = useAppSelector((state) => state.auth);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(updateAuthForm({ [name]: value }));
    },
    [dispatch]
  );

  const onLogin = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (!form.username || !form.password) {
        showToast.warning('사용자명과 비밀번호를 입력해주세요.');
        return;
      }

      try {
        const user = await dispatch(loginAsync(form)).unwrap();
        showToast.success('로그인 되었습니다.');
        const socket = io('https://paysys.kr', { withCredentials: true });

        socket.emit('join', user.user_id);
        socket.on('toast-notification', (payload) => {
          showToast.info(payload.message);
        });
      } catch (error) {
        showToast.error(`로그인 실패: ${error}`);
        console.error(`Login Failed: ${error}`);
      }
    },
    [dispatch, form]
  );

  return {
    form,
    loading,
    error,
    onChange,
    onLogin,
  };
}
