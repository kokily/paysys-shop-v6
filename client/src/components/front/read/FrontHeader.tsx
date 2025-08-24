import type { BillType } from '../../../types/bill.types';
import { unitOfDate, unitOfTime } from '../../../libs/data/utils';
import './FrontHeader.scss';

interface Props {
  front: BillType;
}

function FrontHeader({ front }: Props) {
  return (
    <>
      <div className="front-header-info">
        <h2>
          전표세부내역
          <br />
          <small>[ {front.title} ]</small>
        </h2>
      </div>

      <div className="bar" />

      <div className="front-header-contents">
        <table>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{front.username} 님</td>
            </tr>

            <tr>
              <th>작성일자</th>
              <td>{unitOfDate(front.created_at)}</td>
            </tr>

            <tr>
              <th>작성시간</th>
              <td>{unitOfTime(front.created_at)}</td>
            </tr>

            <tr>
              <th>행사장소</th>
              <td>{front.hall}</td>
            </tr>
          </tbody>
        </table>{' '}
      </div>
    </>
  );
}

export default FrontHeader;
