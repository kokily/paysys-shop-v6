import type { ChangeEvent } from 'react';
import type { AddWeddingPayload } from '../../../../../types/wedding.types';
import TableInput from '../common/TableInput';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Company({ form, onChange }: Props) {
  return (
    <>
      <h3>웨딩 업체</h3>

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
            title="웨딩업체"
            husband_name="husband_company"
            husband_value={form.husband_company}
            bride_name="bride_company"
            bride_value={form.bride_company}
            onChange={onChange}
            unit="원"
          />

          <TableInput
            title="혼주미용(여)"
            husband_name="husband_owner_woman"
            husband_value={form.husband_owner_woman}
            bride_name="bride_owner_woman"
            bride_value={form.bride_owner_woman}
            onChange={onChange}
            unit="원"
          />

          <TableInput
            title="혼주미용(남)"
            husband_name="husband_owner_man"
            husband_value={form.husband_owner_man}
            bride_name="bride_owner_man"
            bride_value={form.bride_owner_man}
            onChange={onChange}
            unit="원"
          />

          <TableInput
            title="액 자"
            husband_name="husband_frame"
            husband_value={form.husband_frame}
            bride_name="bride_frame"
            bride_value={form.bride_frame}
            onChange={onChange}
            unit="원"
          />

          <TableInput
            title="원본파일"
            husband_name="husband_file"
            husband_value={form.husband_file}
            bride_name="bride_file"
            bride_value={form.bride_file}
            onChange={onChange}
            unit="원"
          />

          <TableInput
            title="DVD"
            husband_name="husband_dvd"
            husband_value={form.husband_dvd}
            bride_name="bride_dvd"
            bride_value={form.bride_dvd}
            onChange={onChange}
            unit="원"
          />

          <TableInput
            title="기타비용"
            husband_name="husband_etc"
            husband_value={form.husband_etc}
            bride_name="bride_etc"
            bride_value={form.bride_etc}
            onChange={onChange}
            unit="원"
          />
        </tbody>
      </table>
      <hr />
    </>
  );
}

export default Company;
