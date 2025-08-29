import type { ChangeEvent, KeyboardEvent } from 'react';
import type { AddWeddingPayload } from '../../../types/wedding.types';
import ContentsName from './contents/ContentsName';
import ContentsDate from './contents/ContentsDate';
import Convention from './contents/tables/Convention';
import Company from './contents/tables/Company';
import Meal from './contents/tables/Meal';
import Present from './contents/tables/Present';
import Reserve from './contents/tables/Reserve';
import PreDeposit from './contents/tables/PreDeposit';
import './AddWeddingContents.scss';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangeDate: (date: Date | null) => void;
  onChangeTime: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function AddWeddingContents({ form, onChange, onKeyDown, onChangeDate, onChangeTime }: Props) {
  return (
    <div className="add-wedding-contents-container">
      <ContentsName form={form} onChange={onChange} />
      <ContentsDate form={form} onChangeDate={onChangeDate} onChangeTime={onChangeTime} />

      <hr />

      {/* 웨딩 테이블 시작 */}
      <Convention form={form} onChange={onChange} />
      <Company form={form} onChange={onChange} />
      <Meal form={form} onChange={onChange} />
      <Present form={form} onChange={onChange} />
      <Reserve form={form} onChange={onChange} />
      <PreDeposit form={form} onChange={onChange} onKeyDown={onKeyDown} />
      {/* 웨딩 테이블 종료 */}
    </div>
  );
}

export default AddWeddingContents;
