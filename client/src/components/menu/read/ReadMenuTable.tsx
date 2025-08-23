import type { ChangeEvent } from 'react';
import type { MenuItemType } from '../../../types/item.types';
import { unitOfAccount } from '../../../libs/data/utils';
import './ReadMenuTable.scss';

interface Props {
  menu: MenuItemType;
  price: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ReadMenuTable({ menu, price, onChange }: Props) {
  return (
    <table className="read-menu-table-container">
      <tbody>
        <tr>
          <th>구 분</th>
          <td>{menu.name}</td>
        </tr>
        <tr>
          <th>단 가</th>
          <td>
            {menu.price === 0 ? (
              <input type="number" name="price" value={price} onChange={onChange} />
            ) : (
              <>{unitOfAccount(menu.price, '원')}</>
            )}
          </td>
        </tr>
        <tr>
          <th>단 위</th>
          <td>{menu.unit}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReadMenuTable;
