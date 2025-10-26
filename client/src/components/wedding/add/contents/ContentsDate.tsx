import type { ChangeEvent } from 'react';
import type { AddWeddingPayload } from '../../../../types/wedding.types';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useMobileSimple } from '../../../../libs/hooks/useMobile';
import 'react-datepicker/dist/react-datepicker.css';
import './ContentsDate.scss';

registerLocale('ko', ko);

interface Props {
  form: AddWeddingPayload;
  onChangeDate: (date: Date | null) => void;
  onChangeTime: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function ContentsDate({ form, onChangeDate, onChangeTime }: Props) {
  const isMobile = useMobileSimple();

  return (
    <div className="contents-date-container">
      <div className={`contents-date-group ${isMobile && 'mobile'}`}>
        <span>웨딩일자: </span>
        <DatePicker
          locale="ko"
          selected={form.wedding_at ? new Date(form.wedding_at) : null}
          onChange={onChangeDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하세요"
          isClearable
        />
      </div>

      <div className={`contents-date-group ${isMobile && 'mobile'}`}>
        <span>웨딩시간: </span>
        <select name="event_at" value={form.event_at} onChange={onChangeTime}>
          <option value="">전체</option>
          <option value="11:30">11:30</option>
          <option value="13:00">13:00</option>
          <option value="14:30">14:30</option>
          <option value="16:00">16:00</option>
          <option value="17:30">17:30</option>
          <option value="19:00">19:00</option>
        </select>
      </div>
    </div>
  );
}

export default ContentsDate;
