import type { BillType } from '../../../types/bill.types';
import { unitOfAccount } from '../../../libs/data/utils';
import './FrontTotal.scss';

interface Props {
  front: BillType;
}

function FrontTotal({ front }: Props) {
  return (
    <div className="front-total-container">
      {front.reserve ? (
        <>
          <div className="front-total-pane">
            총 금액 :{' '}
            <span className="front-total-text reserve">{unitOfAccount(front.total_amount, '원')}</span>
          </div>
          <div className="front-total-pane">
            예약금 : <span className="front-total-reserve">{unitOfAccount(front.reserve, '원')}</span>
          </div>
          <div className="front-total-pane">
            결제금액 :{' '}
            <span className="front-total-text">
              {unitOfAccount(front.total_amount - front.reserve, '원')}
            </span>
          </div>
        </>
      ) : (
        <div className="front-total-pane">
          결제금액 : <span className="front-total-text">{unitOfAccount(front.total_amount, '원')}</span>
        </div>
      )}
    </div>
  );
}

export default FrontTotal;
