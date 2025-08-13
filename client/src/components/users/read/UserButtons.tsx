import Button from "@/components/common/Button";
import './UserButtons.scss';

interface Props {
  onBack: () => void;
  onSetAdmin: () => void;
  onModalClick: () => void;
}

function UserButtons({ onBack, onSetAdmin, onModalClick }: Props) {
  return (
    <div className="user-buttons-container">
      <Button variant="menu" onClick={onBack}>
        뒤 로
      </Button>
      <Button variant="cancel" onClick={onModalClick}>
        삭 제
      </Button>
      <Button variant="submit" onClick={onSetAdmin}>
        권한수정
      </Button>
    </div>
  )
}

export default UserButtons;