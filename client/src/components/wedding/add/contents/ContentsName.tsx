import type { ChangeEvent } from 'react';
import type { AddWeddingPayload } from '../../../../types/wedding.types';
import { useMobileSimple } from '../../../../libs/hooks/useMobile';
import ContentsInput from './common/ContentsInput';
import './ContentsName.scss';

interface Props {
  form: AddWeddingPayload;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ContentsName({ form, onChange }: Props) {
  const isMobile = useMobileSimple();

  return (
    <div className="contents-name-container">
      <div className={`contents-name-group ${isMobile && 'mobile'}`}>
        <span>신랑님: </span>
        <strong>
          <ContentsInput name="husband_name" value={form.husband_name} onChange={onChange} />
        </strong>
      </div>

      <div className={`contents-name-group ${isMobile && 'mobile'}`}>
        <span>신부님: </span>
        <strong>
          <ContentsInput name="bride_name" value={form.bride_name} onChange={onChange} />
        </strong>
      </div>
    </div>
  );
}

export default ContentsName;
