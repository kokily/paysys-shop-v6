import Button from '../common/Button';
import './ItemButtons.scss';

interface Props {
  onBack: () => void;
  onUpdateItemPage: () => void;
  onModalClick: () => void;
}

function ItemButtons({ onBack, onUpdateItemPage, onModalClick }: Props) {
  return (
    <div className='item-buttons-container'>
      <Button variant="menu" size="small" onClick={onBack}>
        뒤 로
      </Button>
      <Button variant="edit" size="small" onClick={onUpdateItemPage}>
        수 정
      </Button>
      <Button variant="cancel" size="small" onClick={onModalClick}>
        삭 제
      </Button>
    </div>
  )
}

export default ItemButtons;