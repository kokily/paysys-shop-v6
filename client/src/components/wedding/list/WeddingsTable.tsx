import { unitOfDate } from '../../../libs/data/utils';
import type { WeddingType } from '../../../types/wedding.types';
import './WeddingsTable.scss';

interface Props {
  weddings: WeddingType[];
  onReadWedding: (id: string) => void;
}

function WeddingsTable({ weddings, onReadWedding }: Props) {
  return (
    <div className="weddings-table-container">
      <table className="weddings-table">
        <thead>
          <tr>
            <th>웨딩일자</th>
            <th>웨딩시간</th>
            <th>신랑</th>
            <th>신부</th>
          </tr>
        </thead>
        <tbody>
          {weddings.length > 0 ? (
            weddings.map((wedding, idx) => (
              <tr key={`${wedding.id}-${idx}`} onClick={() => onReadWedding(wedding.id)}>
                <td>{unitOfDate(wedding.wedding_at)}</td>
                <td>{wedding.event_at}</td>
                <td>{wedding.husband_name}</td>
                <td>{wedding.bride_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>웨딩 데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WeddingsTable;
