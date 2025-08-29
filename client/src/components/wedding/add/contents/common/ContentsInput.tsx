import type { ChangeEvent } from 'react';
import './ContentsInput.scss';

interface Props {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ContentsInput({ name, value, onChange }: Props) {
  return <input className="contents-input" type="text" name={name} value={value} onChange={onChange} />;
}

export default ContentsInput;
