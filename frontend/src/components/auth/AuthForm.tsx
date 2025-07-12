import React from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import Right from './Right';

interface Props {
  mode: 'login' | 'register';
  username: string;
  password: string;
  passwordConfirm?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const AuthForm = ({
  mode,
  username,
  password,
  passwordConfirm,
  onChange,
  onLogin,
  isLoading,
}: Props) => {
  return (
    <form className="auth-form" onSubmit={onLogin} autoComplete="off">
      <div className="auth-form__input-group">
        <AuthInput
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
        <span className="auth-form__bar" />
        <label className="auth-form__label">사용자 이름</label>
      </div>
      <div className="auth-form__input-group">
        <AuthInput
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <span className="auth-form__bar" />
        <label className="auth-form__label">비밀번호</label>
      </div>
      {mode === 'register' && (
        <div className="auth-form__input-group">
          <AuthInput
            type="password"
            name="passwordConfirm"
            value={passwordConfirm || ''}
            onChange={onChange}
          />
          <span className="auth-form__bar" />
          <label className="auth-form__label">비밀번호 확인</label>
        </div>
      )}
      <AuthButton
        text={mode === 'login' ? '로그인' : '사원등록'}
        type="submit"
        disabled={isLoading}
      />
      <Right mode={mode} />
    </form>
  );
};

export default AuthForm; 