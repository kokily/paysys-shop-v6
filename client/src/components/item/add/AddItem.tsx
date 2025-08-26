import { divideArray, nativeArray } from '../../../libs/data/sourceFiles';
import { useAddItem } from '../../../libs/hooks/useAddItem';
import Button from '../../common/button/Button';
import ItemInput from './ItemInput';
import ItemSelect from './ItemSelect';
import './AddItem.scss';

function AddItem() {
  const { form, onBack, onChange, onAddItem, onKeyDown, isUpdate } = useAddItem();

  return (
    <div className="add-item-container">
      <div className="add-item-logo">품목 등록</div>

      <form className="add-item-form">
        <ItemInput name="name" value={form.name} onChange={onChange} label="품명" focus />
        <ItemSelect name="divide" value={form.divide} onChange={onChange} data={divideArray} />
        <ItemSelect name="native" value={form.native} onChange={onChange} data={nativeArray} />
        <ItemInput name="unit" value={form.unit} onChange={onChange} label="단위" />
        <ItemInput name="price" value={form.price} onChange={onChange} label="단가" onKeyDown={onKeyDown} />

        <div className="add-item-buttons-box">
          <Button variant="submit" fullWidth onClick={onAddItem}>
            {isUpdate ? '저장하기' : '등록하기'}
          </Button>
          <Button variant="cancel" fullWidth onClick={onBack}>
            취소하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
