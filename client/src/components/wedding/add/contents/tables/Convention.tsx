import type { ChangeEvent } from 'react';
import type { AddWeddingPayload } from '../../../../../types/wedding.types';
import TableInput from '../common/TableInput';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Convention({ form, onChange }: Props) {
  return (
    <>
      <h3>예식 비용</h3>

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
          <TableInput
            title="웨딩홀 사용료"
            husband_name="husband_hall"
            husband_value={form.husband_hall}
            bride_name="bride_hall"
            bride_value={form.bride_hall}
            onChange={onChange}
            unit="원"
          />
          <TableInput
            title="예도물품"
            husband_name="husband_sword"
            husband_value={form.husband_sword}
            bride_name="bride_sword"
            bride_value={form.bride_sword}
            onChange={onChange}
            unit="원"
          />

          <TableInput
            title="부 케"
            husband_name="husband_bouquet"
            husband_value={form.husband_bouquet}
            bride_name="bride_bouquet"
            bride_value={form.bride_bouquet}
            onChange={onChange}
            unit="원"
          />
        </tbody>
      </table>
    </>
  );
}

export default Convention;
