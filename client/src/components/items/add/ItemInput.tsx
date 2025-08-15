import type { ChangeEvent, KeyboardEvent } from 'react';
import './ItemInput.scss';

interface Props {
  focus?: boolean;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function ItemInput({ focus, name, value, onChange, label, onKeyPress}: Props) {
  return (
    <div className='item-input-container'>
      {focus ? (
        <input
          className='item-input'
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required
          autoFocus
        />
      ):(
        <input
          className='item-input'
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required
          onKeyDown={onKeyPress}
        />
      )}
      <span className='item-bar' />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default ItemInput;