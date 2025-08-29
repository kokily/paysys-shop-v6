import type { ChangeEvent } from 'react';
import './TableOneInput.scss';

interface Props {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TableOneInput({ title, name, value, onChange }: Props) {
  return (
    <tr>
      <th>{title}</th>
      <td colSpan={3}>
        <input className="table-one-input" type="number" name={name} value={value} onChange={onChange} />
      </td>
    </tr>
  );
}

export default TableOneInput;
