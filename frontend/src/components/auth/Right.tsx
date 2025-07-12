import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  mode: 'login' | 'register';
}

const Right = ({ mode }: Props) => (
  <div className="auth-right">
    {mode === 'login' ? (
      <Link to="/register" className="auth-right__link">사원등록</Link>
    ) : (
      <Link to="/login" className="auth-right__link">로그인</Link>
    )}
  </div>
);

export default Right; 