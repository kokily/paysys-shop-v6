import type { ChangeEvent } from 'react';
import type { AddWeddingPayload } from '../../../../../types/wedding.types';
import { presentData } from '../../../../../libs/data/weddingData';
import TableSelect from '../common/TableSelect';
import TableOneInput from '../common/TableOneInput';
import TableInput from '../common/TableInput';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function Present({ form, onChange }: Props) {
  return (
    <>
      <h3>답례품 비용</h3>

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
            title="답례품 분할"
            name="present_method"
            value={form.present_method}
            onChange={onChange}
            data={presentData}
          />

          <TableOneInput
            title="답례품 단가"
            name="present_price"
            value={form.present_price}
            onChange={onChange}
          />

          <TableInput
            title="하객인원"
            husband_name="husband_present"
            husband_value={form.husband_present}
            bride_name="bride_present"
            bride_value={form.bride_present}
            onChange={onChange}
            unit="명"
          />
        </tbody>
      </table>
      <hr />
    </>
  );
}

export default Present;
