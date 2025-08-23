import type { MenuItemType } from '../../../types/item.types';
import { unitOfAccount } from '../../../libs/data/utils';
import './MenuItem.scss';

interface Props {
  item: MenuItemType;
  onReadMenu: (id: string) => void;
}

function MenuItem({ item, onReadMenu }: Props) {
  return (
    <div className={`menu-item-container ${item.native}`} onClick={() => onReadMenu(item.id)}>
      {item.name} | {unitOfAccount(item.price, '원')}
    </div>
  );
}

export default MenuItem;
