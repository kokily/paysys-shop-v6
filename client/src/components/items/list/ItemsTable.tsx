import type { ItemType } from '@/types/item.types';
import './ItemsTable.scss';
import { unitOfAccount } from '@/utils/menuUtils';

interface Props {
  items: ItemType[];
  onReadItem: (id: string) => void;
  onDivideSearch: (searchTer: string) => void;
  onNativeSearch: (searchTer: string) => void;
}

function ItemsTable({ items, onReadItem, onDivideSearch, onNativeSearch }: Props) {
  return (
    <table className='items-table-container'>
      <thead>
        <tr>
          <th>분류</th>
          <th>구분</th>
          <th>상품명</th>
          <th>단위</th>
          <th>단가</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map(item => (
            <tr key={item.id}>
              <td className='link' onClick={() => onDivideSearch(item.divide)}>
                <span>
                  {item.divide}
                </span>
              </td>
              <td className='link' onClick={() => onNativeSearch(item.native)}>
                <span>
                  {item.native}
                </span>
              </td>
              <td className='link' onClick={() => onReadItem(item.id)}>
                <span>
                  {item.name}
                </span>
              </td>
              <td>{item.unit}</td>
              <td>{unitOfAccount(item.price, '원')}</td>
            </tr>
          ))
        ):(
          <tr>
            <td colSpan={5}>데이터가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ItemsTable;