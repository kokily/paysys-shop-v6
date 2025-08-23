import { MdArrowDropDown } from 'react-icons/md';
import './Apeach.scss';

interface Props {
  onClick: () => void;
}

function Apeach({ onClick }: Props) {
  return (
    <div className="apeach-container" onClick={onClick}>
      <div className="apeach-box" />
      <MdArrowDropDown />
    </div>
  );
}

export default Apeach;
