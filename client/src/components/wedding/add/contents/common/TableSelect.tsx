import type { ChangeEvent } from 'react';
import './TableSelect.scss';

interface Props {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: {
    value: string;
    title: string;
  }[];
}

function TableSelect({ title, name, value, onChange, data }: Props) {
  return (
    <tr>
      <th>{title}</th>
      <td className="table-select-data sub" colSpan={3} style={{ textAlign: 'center' }}>
        <select
          className="table-select"
          name={name}
          value={value}
          onChange={(e) => {
            console.log(e.target.name, e.target.value);
            onChange(e);
          }}
        >
          {data.map((item) => (
            <option key={item.title} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

export default TableSelect;
