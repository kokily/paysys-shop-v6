import React from 'react';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const AuthInput = React.forwardRef<HTMLInputElement, Props>(
  ({ type, name, value, onChange, onKeyPress, placeholder }, ref) => (
    <input
      ref={ref}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className="auth-form__input"
      placeholder={placeholder || ' '}
      required
      autoComplete={name}
    />
  )
);

export default AuthInput; 