import type { ChangeEvent, KeyboardEvent } from 'react';
import './ItemInput.scss';

interface Props {
  focus?: boolean;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  onKeyDown?: (e: KeyboardEvent) => void;
}

function ItemInput({ focus, name, value, onChange, label, onKeyDown }: Props) {
  return (
    <div className="item-input-container">
      {focus ? (
        <input
          className="item-input"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required
          autoFocus
        />
      ) : (
        <input
          className="item-input"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required
          onKeyDown={onKeyDown}
        />
      )}
      <span className="item-input-bar" />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default ItemInput;
