import type { SyntheticEvent } from 'react';
import Button from '../../common/button/Button';
import './AddWeddingButtons.scss';

interface Props {
  onBack: () => void;
  onAddWedding: (e: SyntheticEvent) => void;
}

function AddWeddingButtons({ onBack, onAddWedding }: Props) {
  return (
    <div className="add-wedding-buttons-container">
      <Button variant="cancel" onClick={onBack}>
        취소하기
      </Button>
      <Button variant="submit" onClick={onAddWedding}>
        저장하기
      </Button>
    </div>
  );
}

export default AddWeddingButtons;
