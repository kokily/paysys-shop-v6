import { useListWeddings } from "@/hooks/useListWeddings";
import './ListWeddings.scss';
import WeddingsTable from "./WeddingsTable";
import Button from "@/components/common/Button";

function ListWeddings() {
  const {
    weddings,
    loading,
    error,
    hasMore,
    onReadWedding,
    onAddWeddingPage,
    setTarget
  } = useListWeddings();

  return (
    <div className="list-weddings-container">
      <h2>웨딩 빌지 리스트</h2>

      <Button variant="cancel" size="medium" onClick={onAddWeddingPage}>
        웨딩 추가
      </Button>

      <WeddingsTable weddings={weddings} onReadWedding={onReadWedding} />

      {loading && <div>로딩 중...</div>}

      <div ref={setTarget} className="observer" />
    </div>
  )
}

export default ListWeddings;