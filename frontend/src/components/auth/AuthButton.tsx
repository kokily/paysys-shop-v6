import React from 'react';

interface Props {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const AuthButton = ({ text, onClick, type = 'button', disabled }: Props) => (
  <button className="auth-button" onClick={onClick} type={type} disabled={disabled}>
    <div className="auth-button__layer">어서오세요!</div>
    {text}
  </button>
);

export default AuthButton; 