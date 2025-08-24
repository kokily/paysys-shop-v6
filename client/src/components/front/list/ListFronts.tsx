import { useListBills } from '../../../libs/hooks/useListBills';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import Search from '../../common/search/Search';
import FrontsContents from './FrontsContents';
import './ListFronts.scss';

function ListFronts() {
  const {
    bills,
    loading,
    error,
    title,
    onChange,
    onSearchTitle,
    onHallSearch,
    onUserSearch,
    onReadFront,
    setTarget,
  } = useListBills();

  if (error) {
    return <Error code="500" message="알 수 없는 오류" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="list-fronts-container">
      <h2>프런트 전표 현황</h2>

      <Search value={title} onChange={onChange} onSearch={onSearchTitle} placeholder="행사명을 검색하세요" />

      <FrontsContents
        bills={bills}
        onHallSearch={onHallSearch}
        onUserSearch={onUserSearch}
        onReadFront={onReadFront}
      />

      <div ref={setTarget} className="observer" />
    </div>
  );
}

export default ListFronts;