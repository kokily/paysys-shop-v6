import type { ItemType } from '../../../types/item.types';
import { unitOfAccount } from '../../../libs/data/utils';
import './ItemContent.scss';

interface Props {
  item: ItemType;
}

function ItemContent({ item }: Props) {
  return (
    <div className="item-content-container">
      <table>
        <tbody>
          <tr>
            <th>품명</th>
            <td>{item.name}</td>
          </tr>
          <tr>
            <th>출신</th>
            <td>{item.native}</td>
          </tr>
          <tr>
            <th>구분</th>
            <td>{item.divide}</td>
          </tr>
          <tr>
            <th>단위</th>
            <td>{item.unit}</td>
          </tr>
          <tr>
            <th>단가</th>
            <td>{unitOfAccount(item.price, '원')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ItemContent;
