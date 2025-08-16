import type { WeddingType } from '@/types/wedding.types';
import { unitOfDate } from '@/utils/menuUtils';
import './WeddingsTable.scss';

interface Props {
  weddings: WeddingType[];
  onReadWedding: (id: string) => void;
}

function WeddingsTable({ weddings, onReadWedding }: Props) {
  return (
    <div className='weddings-table-container'>
      <table className='weddings-table'>
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
            weddings.map(wedding => (
              <tr key={wedding.id}>
                <td>
                  <span onClick={() => onReadWedding(wedding.id)}>
                    {unitOfDate(wedding.created_at)}
                  </span>
                </td>
                <td>{wedding.event_at}</td>
                <td>{wedding.husband_name}</td>
                <td>{wedding.bride_name}</td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan={4}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WeddingsTable;