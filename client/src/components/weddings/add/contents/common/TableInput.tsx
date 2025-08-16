import type { ChangeEvent } from 'react';
import { unitOfAccount } from '@/utils/menuUtils';
import './TableInput.scss';

interface Props {
  title: string;
  husband_name: string;
  husband_value: string;
  bride_name: string;
  bride_value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  unit: string;
}

function TableInput({
  title,
  husband_name,
  husband_value,
  bride_name,
  bride_value,
  onChange,
  unit
}: Props) {
  const result = parseInt(husband_value) + parseInt(bride_value);

  return (
    <tr>
      <th>{title}</th>
      <td>
        <input
          className='table-input'
          type="text"
          name={husband_name}
          value={husband_value}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          className='table-input'
          type="text"
          name={bride_name}
          value={bride_value}
          onChange={onChange}
        />
      </td>
      <td>
        {isNaN(result) ? `0${unit}` : unitOfAccount(result, unit)}
      </td>
    </tr>
  );
};

export default TableInput;