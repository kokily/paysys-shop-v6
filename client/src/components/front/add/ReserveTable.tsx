import type { ChangeEvent, KeyboardEvent } from 'react';
import './ReserveTable.scss';

interface Props {
  reserve: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

function ReserveTable({ reserve, onChange, onKeyDown }: Props) {
  return (
    <div className="reserve-table-container">
      <table className="reserve-table">
        <tbody>
          <tr>
            <th>금 액</th>
            <td>
              <input
                className="reserve-table-input"
                type="number"
                value={reserve}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReserveTable;
