import { useCallback, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePasswordAsync, clearError, clearForm, updateForm } from "@/store/slices/userSlice";
import { showToast } from "@/utils/toast";

export function useChangePassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, form } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  }, [dispatch]);

  const onClearForm = useCallback(() => {
    dispatch(clearForm());
  }, [dispatch]);

  const onClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (!form.password) {
      showToast.error('새 비밀번호를 입력해주세요.');
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
      dispatch(clearForm());
    } catch (error: any) {
      showToast.error(error.message || '비밀번호 변경에 실패했습니다.');
    }
  }, [dispatch, form, navigate]);

  return {
    form,
    loading,
    error,
    user,
    onChange,
    onBack,
    onSubmit,
  };
};