import type { ChangeEvent, KeyboardEvent } from 'react';
import { unitOfAccount } from '../../../../../libs/data/utils';
import './TableInput.scss';

interface Props {
  title: string;
  husband_name: string;
  husband_value: string;
  bride_name: string;
  bride_value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function TableInput({
  title,
  husband_name,
  husband_value,
  bride_name,
  bride_value,
  onChange,
  unit,
  onKeyDown,
}: Props) {
  const result = parseInt(husband_value) + parseInt(bride_value);

  return (
    <tr>
      <th>{title}</th>
      <td>
        <input
          className="table-input"
          type="text"
          name={husband_name}
          value={husband_value}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          className="table-input"
          type="text"
          name={bride_name}
          value={bride_value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </td>
      <td>{isNaN(result) ? `0${unit}` : unitOfAccount(result, unit)}</td>
    </tr>
  );
}

export default TableInput;
