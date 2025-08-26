import { useListItems } from '../../../libs/hooks/useListItems';
import Button from '../../common/button/Button';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import Search from '../../common/search/Search';
import ItemsTable from './ItemsTable';
import './ListItems.scss';

function ListItems() {
  const {
    items,
    loading,
    error,
    name,
    onReadItem,
    onChange,
    onSearchName,
    onSearchDivide,
    onSearchNative,
    onAddItemPage,
    setTarget,
  } = useListItems();

  if (error) {
    const code = error.slice(-3, error.length);
    return <Error code={code} message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="list-items-container">
      <h1>아이템 리스트</h1>

      <Search value={name} onChange={onChange} onSearch={onSearchName} placeholder="품목명을 검색하세요" />

      <Button variant="cancel" onClick={onAddItemPage}>
        추 가
      </Button>

      <ItemsTable
        items={items}
        onReadItem={onReadItem}
        onSearchDivide={onSearchDivide}
        onSearchNative={onSearchNative}
      />

      <div ref={setTarget} className="observer" />
    </div>
  );
}

export default ListItems;
