import type { ChangeEvent } from 'react';
import './ItemSelect.scss';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
}

function ItemSelect({ name, value, onChange, data }: Props) {
  return (
    <div className='item-select-container'>
      <select
        className='item-select-select'
        name={name}
        value={value}
        onChange={onChange}
      >
        {data.map((divide) => (
          <option key={divide} value={divide}>
            {divide}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemSelect;