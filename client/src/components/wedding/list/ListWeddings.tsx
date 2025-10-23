import { useListWeddings } from '../../../libs/hooks/useListWeddings';
import Button from '../../common/button/Button';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import WeddingsTable from './WeddingsTable';
import './ListWeddings.scss';

function ListWeddings() {
  const { weddings, loading, error, onReadWedding, onAddWeddingPage, setTarget } = useListWeddings();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="list-weddings-container">
      <h2>웨딩 빌지 리스트</h2>

      <Button variant="cancel" size="medium" onClick={onAddWeddingPage}>
        웨딩 추가
      </Button>

      <WeddingsTable weddings={weddings} onReadWedding={onReadWedding} />

      <div ref={setTarget} className="observer" />
    </div>
  );
}

export default ListWeddings;
