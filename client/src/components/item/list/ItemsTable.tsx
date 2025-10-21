import type { ItemDivideType, ItemType, NativeLabel } from '../../../types/item.types';
import { unitOfAccount } from '../../../libs/data/utils';
import './ItemsTable.scss';

interface Props {
  items: ItemType[];
  onReadItem: (id: string) => void;
  onSearchDivide: (divideName: ItemDivideType) => void;
  onSearchNative: (nativeName: NativeLabel) => void;
}

function ItemsTable({ items, onReadItem, onSearchDivide, onSearchNative }: Props) {
  return (
    <table className="items-table-container">
      <thead>
        <tr>
          <th>분류</th>
          <th>구분</th>
          <th>품명</th>
          <th>단위</th>
          <th>단가</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item, idx) => (
            <tr key={`${item.id}-${idx}`}>
              <td className="link" onClick={() => onSearchDivide(item.divide as ItemDivideType)}>
                <span>{item.divide}</span>
              </td>
              <td className="link" onClick={() => onSearchNative(item.native as NativeLabel)}>
                <span>{item.native}</span>
              </td>
              <td className="link" onClick={() => onReadItem(item.id)}>
                <span>{item.name}</span>
              </td>
              <td>{item.unit}</td>
              <td>{unitOfAccount(item.price, '원')}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>데이터가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ItemsTable;
