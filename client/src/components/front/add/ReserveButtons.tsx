import type { SyntheticEvent } from 'react';
import Button from '../../common/button/Button';
import './ReserveButtons.scss';

interface Props {
  onBack: () => void;
  onAddReserve: (e: SyntheticEvent) => void;
}

function ReserveButtons({ onAddReserve, onBack }: Props) {
  return (
    <div className="reserve-buttons-container">
      <Button variant="cancel" onClick={onBack}>
        취 소
      </Button>
      <Button variant="submit" onClick={onAddReserve}>
        저 장
      </Button>
    </div>
  );
}

export default ReserveButtons;
