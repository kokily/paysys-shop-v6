import { useAddReserve } from '../../../libs/hooks/useAddReserve';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import ReserveButtons from './ReserveButtons';
import ReserveTable from './ReserveTable';
import './AddReserve.scss';

function AddReserve() {
  const { reserve, error, loading, onBack, onChange, onAddReserve, onKeyDown } = useAddReserve();

  if (error) {
    return <Error code="500" message="알 수 없는 오류" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="add-reserve-container">
      <div className="add-reserve-logo">
        <h2>예약금 추가</h2>
      </div>

      <ReserveTable reserve={reserve} onChange={onChange} onKeyDown={onKeyDown} />
      <ReserveButtons onBack={onBack} onAddReserve={onAddReserve} />
    </div>
  );
}

export default AddReserve;
