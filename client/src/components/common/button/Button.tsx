import type { MouseEvent, PropsWithChildren } from 'react';
import './Button.scss';

interface Props extends PropsWithChildren {
  variant?:
    | 'submit'
    | 'cancel'
    | 'edit'
    | 'remove'
    | 'restore'
    | 'menu'
    | 'reserve'
    | 'employee'
    | 'admin';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

function Button({
  children,
  variant = 'submit',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}: Props) {
  const getClassname = (): string => {
    const baseClass = 'button-container';
    const classes = [
      baseClass,
      `${baseClass}--${variant}`,
      `${baseClass}--${size}`,
      fullWidth ? `${baseClass}--full-width` : '',
      disabled ? `${baseClass}--disabled` : '',
      className,
    ];

    return classes.filter(Boolean).join(' ');
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    }

    // 기존 blur 기능 유지
    e.currentTarget.blur();
  };

  return (
    <button
      type={type}
      className={getClassname()}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
