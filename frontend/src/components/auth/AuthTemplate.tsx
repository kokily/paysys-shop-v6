import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/Auth.scss';

interface Props {
  mode: 'login' | 'register';
  children: React.ReactNode;
}

const AuthTemplate = ({ mode, children }: Props) => (
  <div className="auth-template">
    <div className="auth-template__logo">
      <Link to={mode === 'login' ? '/login' : '/register'} className="auth-template__logo-link">
        {mode === 'login' ? '로그인' : '사원등록'}
      </Link>
    </div>
    {children}
  </div>
);

export default AuthTemplate; 