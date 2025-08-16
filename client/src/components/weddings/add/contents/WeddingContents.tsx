import type { ChangeEvent, KeyboardEvent } from 'react';
import type { AddWeddingRequest } from '@/types/wedding.types';
import './WeddingContents.scss';
import ContentsName from './ContentsName';
import ContentsDate from './ContentsDate';
import Convention from './tables/Convention';
import Company from './tables/Company';
import Meal from './tables/Meal';
import Present from './tables/Present';
import Reserve from './tables/Reserve';
import PreDeposit from './tables/PreDeposit';

interface Props {
  form: AddWeddingRequest;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangeDate: (date: Date | null) => void;
  onChangeTime: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function WeddingContents({ form, onChange, onKeyPress, onChangeDate, onChangeTime }: Props) {
  return (
    <div className='wedding-contents-container'>
      <ContentsName form={form} onChange={onChange} />
      <ContentsDate form={form} onChangeDate={onChangeDate} onChangeTime={onChangeTime} />

      <hr />

      {/* 웨딩 테이블 시작 */}
      <Convention form={form} onChange={onChange} />
      <Company form={form} onChange={onChange} />
      <Meal form={form} onChange={onChange} />
      <Present form={form} onChange={onChange} />
      <Reserve form={form} onChange={onChange} />
      <PreDeposit form={form} onChange={onChange} />
      {/* 웨딩 테이블 종료 */}
    </div>
  );
};

export default WeddingContents;