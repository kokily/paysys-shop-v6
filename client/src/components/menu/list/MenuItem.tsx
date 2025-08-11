import type { ItemType } from '@/types/menu.types';
import { unitOfAccount } from '@/utils/menuUtils';
import './MenuItem.scss';

interface Props {
  item: ItemType;
  onReadItem: (id: string) => void;
}

function MenuItem({ item, onReadItem }: Props) {
  return (
    <div className={`menu-item-container ${item.native}`} onClick={() => onReadItem(item.id)}>
      {item.name} |{' '}
      {unitOfAccount(item.price, '원')}
    </div>
  )
}

export default MenuItem;