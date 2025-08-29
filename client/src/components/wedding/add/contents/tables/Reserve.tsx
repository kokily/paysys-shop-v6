import type { ChangeEvent } from 'react';
import type { AddWeddingPayload } from '../../../../../types/wedding.types';
import { reserveData } from '../../../../../libs/data/weddingData';
import TableSelect from '../common/TableSelect';
import TableOneInput from '../common/TableOneInput';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function Reserve({ form, onChange }: Props) {
  return (
    <>
      <h3>예약금</h3>

      <table>
        <thead>
          <tr>
            <th>구 분</th>
            <th className="basic husband">신랑</th>
            <th className="basic bride">신부</th>
            <th className="basic red">계</th>
          </tr>
        </thead>
        <tbody>
          <TableSelect
            title="예약금 분할"
            name="reserve_method"
            value={form.reserve_method}
            onChange={onChange}
            data={reserveData}
          />

          <TableOneInput title="예약금" name="reserve_price" value={form.reserve_price} onChange={onChange} />
        </tbody>
      </table>
      <hr />
    </>
  );
}

export default Reserve;
