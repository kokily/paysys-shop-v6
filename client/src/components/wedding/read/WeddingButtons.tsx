import Button from '../../common/button/Button';
import './WeddingButtons.scss';

interface Props {
  onBack: () => void;
  onUpdateWeddingPage: () => void;
  onModalClick: () => void;
}

function WeddingButtons({ onBack, onUpdateWeddingPage, onModalClick }: Props) {
  return (
    <div className="wedding-buttons-container">
      <Button variant="menu" onClick={onBack}>
        목록
      </Button>
      <Button variant="edit" onClick={onUpdateWeddingPage}>
        수정
      </Button>
      <Button variant="cancel" onClick={onModalClick}>
        삭제
      </Button>
    </div>
  );
}

export default WeddingButtons;
