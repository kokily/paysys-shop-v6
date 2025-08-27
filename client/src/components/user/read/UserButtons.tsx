import Button from '../../common/button/Button';
import './UserButtons.scss';

interface Props {
  onBack: () => void;
  onSetAdmin: () => void;
  onModalClick: () => void;
}

function UserButtons({ onBack, onSetAdmin, onModalClick }: Props) {
  return (
    <div className="user-buttons-container">
      <Button variant="cancel" onClick={onBack}>
        뒤 로
      </Button>
      <Button variant="edit" onClick={onSetAdmin}>
        등 급
      </Button>
      <Button variant="menu" onClick={onModalClick}>
        삭 제
      </Button>
    </div>
  );
}

export default UserButtons;
