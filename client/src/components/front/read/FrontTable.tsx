import type { BillType } from '../../../types/bill.types';
import { unitOfAccount } from '../../../libs/data/utils';
import './FrontTable.scss';

interface Props {
  front: BillType;
}

function FrontTable({ front }: Props) {
  return (
    <table className="front-table-container">
      <thead>
        <tr>
          <th>구분</th>
          <th>상품명</th>
          <th>단가</th>
          <th>수량</th>
          <th>소계</th>
        </tr>
      </thead>
      <tbody>
        {front.items === null || front.items.length === 0 ? (
          <tr>
            <td colSpan={5}>데이터가 없습니다.</td>
          </tr>
        ) : (
          <>
            {front.items.map((item, idx) => (
              <tr key={`${item.id}-${idx}`}>
                <td className={item.native}>{item.native}</td>
                <td>{item.name}</td>
                <td>{unitOfAccount(item.price, '원')}</td>
                <td>{unitOfAccount(item.count, item.unit)}</td>
                <td className="sub-total">{unitOfAccount(item.amount, '원')}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

export default FrontTable;
