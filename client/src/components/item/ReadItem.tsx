import { useReadItem } from "@/hooks/useReadItem";
import ItemButtons from "./ItemButtons";
import ItemContent from "./ItemContent";
import './ReadItem.scss';

function ReadItem() {
  const {
    item,
    loading,
    error,
    onBack,
    onUpdateItemPage,
    onModalClick,
  } = useReadItem();

  if (error) {
    return (
      <div className="menu-error">
        <p>에러 발생: {error}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="menu-loading">
        <p>로딩 중...</p>
      </div>
    );
  };

  return (
    <div className="read-item-container">
      <div className="read-item-contents">
        <h3>품목 상세보기</h3>

        <div className="read-item-down-border" />

        <ItemButtons
          onBack={onBack}
          onUpdateItemPage={onUpdateItemPage}
          onModalClick={onModalClick}
        />

        {item && <ItemContent item={item} />}
      </div>
    </div>
  );
};

export default ReadItem;