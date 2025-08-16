import type { WeddingType } from '@/types/wedding.types';
import { unitOfDate } from '@/utils/menuUtils';
import './WeddingPane.scss';

interface Props {
  wedding: WeddingType;
}

function WeddingPane({ wedding }: Props) {
  return (
    <div className='wedding-pane-container'>
      <h2 className='wedding-pane-title'>
        웨딩 정산내역
      </h2>
      <h3 className='wedding-pane-names'>
        신랑님:{' '}
        <strong className='select'>
          {wedding.husband_name}
        </strong>{' '}
        <strong className='heart'>♡</strong>{' '}
        신부님:{' '}
        <strong className='select'>
          {wedding.bride_name}
        </strong>
      </h3>

      <h4 className='wedding-pane-date'>
        웨딩일시: {unitOfDate(wedding.wedding_at)}{' '}{wedding.event_at}
      </h4>

      <div>신랑 서명</div>
      <div>신부 서명</div>

      <hr />

      <h3 className='wedding-pane-sub-title'>
        웨딩 비용
      </h3>
    </div>
  );
};

export default WeddingPane;