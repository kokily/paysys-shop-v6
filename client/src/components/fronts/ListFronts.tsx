import { useBills } from "@/hooks/useListBills";
import './ListFronts.scss';
import Search from "../common/Search";
import FrontsContents from "./FrontsContents";

function ListFronts() {
  const {
    bills,
    loading,
    error,
    hasMore,
    search,
    onChange,
    onSearch,
    onReadFront,
    onHallSearch,
    onUserSearch,
    setTarget,
  } = useBills();

  return (
    <div className="list-fronts-container">
      <h2>프런트 전표 현황</h2>

      <Search
        value={search}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="행사제목 찾기"
      />

      <FrontsContents
        bills={bills}
        onHallSearch={onHallSearch}
        onUserSearch={onUserSearch}
        onReadFront={onReadFront}
      />

      {loading && <div>로딩 중...</div>}

      <div ref={setTarget} className="observer" />
    </div>
  )
}

export default ListFronts;