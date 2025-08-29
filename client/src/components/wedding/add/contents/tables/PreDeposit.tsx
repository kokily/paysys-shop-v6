import type { ChangeEvent, KeyboardEvent } from 'react';
import type { AddWeddingPayload } from '../../../../../types/wedding.types';
import TableInput from '../common/TableInput';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

function PreDeposit({ form, onChange, onKeyDown }: Props) {
  return (
    <>
      <h3>선 입금</h3>

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
            title="선 입금"
            husband_name="husband_pre_deposit"
            husband_value={form.husband_pre_deposit}
            bride_name="bride_pre_deposit"
            bride_value={form.bride_pre_deposit}
            onChange={onChange}
            unit="원"
            onKeyDown={onKeyDown}
          />
        </tbody>
      </table>
      <hr />
    </>
  );
}

export default PreDeposit;
