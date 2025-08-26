import Button from '../../common/button/Button';

interface Props {
  onBack: () => void;
  onUpdateItemPage: () => void;
  onModalClick: () => void;
}

function ItemButtons({ onBack, onUpdateItemPage, onModalClick }: Props) {
  return (
    <div className="item-buttons-container">
      <Button variant="cancel" onClick={onBack}>
        뒤로
      </Button>
      <Button variant="edit" onClick={onUpdateItemPage}>
        수정
      </Button>
      <Button variant="submit" onClick={onModalClick}>
        삭제
      </Button>
    </div>
  );
}

export default ItemButtons;
