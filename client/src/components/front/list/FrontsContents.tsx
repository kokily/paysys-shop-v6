import { unitOfDate } from '../../../libs/data/utils';
import type { BillType } from '../../../types/bill.types';
import './FrontsContents.scss';

interface Props {
  bills: BillType[];
  onHallSearch: (hallName: string) => void;
  onUserSearch: (userId: string) => void;
  onReadFront: (id: string) => void;
}

function FrontsContents({ bills, onHallSearch, onUserSearch, onReadFront }: Props) {
  return (
    <table className="fronts-contents-container">
      <thead>
        <tr>
          <th>날짜</th>
          <th>구분</th>
          <th>행사명</th>
          <th>장소</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        {bills === null || bills.length === 0 ? (
          <tr>
            <td colSpan={5}>작성된 전표가 없습니다.</td>
          </tr>
        ) : (
          <>
            {bills.map((bill, idx) => (
              <tr key={`${bill.id}-${idx}`}>
                <td>{unitOfDate(bill.created_at)}</td>
                <td>{bill.items[0].native}</td>
                <td>
                  <strong onClick={() => onReadFront(bill.id)}>
                    {bill.title.length > 20 ? <>{bill.title.slice(0, 20)}...</> : <>{bill.title}</>}
                  </strong>
                </td>
                <td className="link" onClick={() => onHallSearch(bill.hall)}>
                  {bill.hall}
                </td>
                <td className="link" onClick={() => onUserSearch(bill.user_id)}>
                  {bill.username}님
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

export default FrontsContents;
