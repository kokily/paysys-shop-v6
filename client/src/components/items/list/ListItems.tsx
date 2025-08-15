import { useListItems } from "@/hooks/useListItems";
import Search from "@/components/common/Search";
import Button from "@/components/common/Button";
import ItemsTable from "./ItemsTable";
import './ListItems.scss';

function ListItems() {
  const {
    items,
    loading,
    error,
    search,
    hasMore,
    onChange,
    onSearch,
    onReadItem,
    onDivideSearch,
    onNativeSearch,
    onAddItemPage,
    setTarget
  } = useListItems();

  return (
    <div className="list-items-container">
      <h1>아이템 리스트</h1>

      <Search
        value={search}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="품목명을 검색하세요"
      />

      <Button variant="cancel" onClick={onAddItemPage}>
        추 가
      </Button>

      <ItemsTable
        items={items}
        onReadItem={onReadItem}
        onDivideSearch={onDivideSearch}
        onNativeSearch={onNativeSearch}
      />

      {loading && <div>로딩 중...</div>}

      <div ref={setTarget} className="observer" />
    </div>
  );
};

export default ListItems;