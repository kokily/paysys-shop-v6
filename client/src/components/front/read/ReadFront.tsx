import { useReadBill } from '../../../libs/hooks/useReadBill';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import FrontButtons from './FrontButtons';
import FrontEtc from './FrontEtc';
import FrontHeader from './FrontHeader';
import FrontTable from './FrontTable';
import FrontTotal from './FrontTotal';
import './ReadFront.scss';

function ReadFront() {
  const { bill, user, loading, error, onBack, onModalClick, onRemoveReserve, onReservePage, onRestore } =
    useReadBill();

  if (error) {
    return <Error code="500" message="알 수 없는 오류" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="read-front-container">
      {bill && (
        <div className="read-front-contents">
          <FrontHeader front={bill} />
          <FrontTable front={bill} />

          {bill.etc !== '' && bill.etc !== ' ' && <FrontEtc etc={bill.etc} />}

          <hr />

          <FrontTotal front={bill} />
          <FrontButtons
            front={bill}
            user={user!}
            onBack={onBack}
            onModalClick={onModalClick}
            onRemoveReserve={onRemoveReserve}
            onReservePage={onReservePage}
            onRestore={onRestore}
          />
        </div>
      )}
    </div>
  );
}

export default ReadFront;
