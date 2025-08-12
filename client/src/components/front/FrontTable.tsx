import type { BillType } from "@/types/bill.types";
import { unitOfAccount } from "@/utils/menuUtils";
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
        ):(
          <>
            {front.items.map(item => (
              <tr key={item.id}>
                <td className={item.native}>{item.native}</td>
                <td className={item.native}>{item.name}</td>
                <td className={item.native}>{unitOfAccount(item.price, '원')}</td>
                <td className={item.native}>{item.count}</td>
                <td className={item.native}>{unitOfAccount(item.price * item.count, '원')}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default FrontTable;