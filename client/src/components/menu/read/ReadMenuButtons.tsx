import type { SyntheticEvent } from 'react';
import Button from '../../common/button/Button';
import './ReadMenuButtons.scss';

interface Props {
  onBack: () => void;
  onAddMenu: (e: SyntheticEvent) => void;
}

function ReadMenuButtons({ onBack, onAddMenu }: Props) {
  return (
    <div className="read-menu-buttons">
      <Button variant="cancel" onClick={onBack}>
        뒤 로
      </Button>
      <Button variant="submit" onClick={onAddMenu}>
        전 송
      </Button>
    </div>
  );
}

export default ReadMenuButtons;
