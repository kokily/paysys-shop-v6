import type { ChangeEvent } from 'react';
import type { AddWeddingPayload } from '../../../../../types/wedding.types';
import { mealData } from '../../../../../libs/data/weddingData';
import TableSelect from '../common/TableSelect';
import TableOneInput from '../common/TableOneInput';
import TableInput from '../common/TableInput';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function Meal({ form, onChange }: Props) {
  return (
    <>
      <h3>식사 비용</h3>

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
            title="식대분할"
            name="meal_method"
            value={form.meal_method}
            onChange={onChange}
            data={mealData}
          />

          <TableOneInput title="식대단가" name="meal_price" value={form.meal_price} onChange={onChange} />

          <TableInput
            title="하객인원"
            husband_name="husband_meal"
            husband_value={form.husband_meal}
            bride_name="bride_meal"
            bride_value={form.bride_meal}
            onChange={onChange}
            unit="명"
          />
        </tbody>
      </table>
      <hr />
    </>
  );
}

export default Meal;
