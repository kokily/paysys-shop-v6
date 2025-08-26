import { useReadItem } from '../../../libs/hooks/useReadItem';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import ItemButtons from './ItemButtons';
import ItemContent from './ItemContent';
import './ReadItem.scss';

function ReadItem() {
  const { item, loading, error, onBack, onUpdateItemPage, onModalClick } = useReadItem();

  if (error) {
    return <Error code="500" message="알 수 없는 오류" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="read-item-container">
      <div className="read-item-contents">
        <h3>품목 상세보기</h3>

        <div className="read-item-downborder" />

        <ItemButtons onBack={onBack} onUpdateItemPage={onUpdateItemPage} onModalClick={onModalClick} />

        {item && <ItemContent item={item} />}
      </div>
    </div>
  );
}

export default ReadItem;
