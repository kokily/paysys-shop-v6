import type { ChangeEvent } from 'react';
import './CartInputs.scss';

interface Props {
  title: string;
  hall: string;
  etc: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  value,
  label,
  onChange,
  small,
}: {
  name: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  small?: boolean;
}) => (
  <>
    <input
      className="cart-form-input"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required
    />
    <span className="cart-form-bar" />
    <label htmlFor={name} className="cart-form-label">
      {label} {small && <small>필수</small>}
    </label>
  </>
);

function CartInputs({ title, hall, etc, onChange }: Props) {
  return (
    <div className="cart-form-container">
      <div className="cart-form-group">
        <Input name="title" value={title} onChange={onChange} label="행사명" small />
      </div>
      <div className="cart-form-group">
        <Input name="hall" value={hall} onChange={onChange} label="행사홀" small />
      </div>
      <div className="cart-form-group">
        <Input name="etc" value={etc} onChange={onChange} label="기타사항" />
      </div>
    </div>
  );
}

export default CartInputs;
