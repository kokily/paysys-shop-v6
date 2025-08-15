import { useAddItem } from "@/hooks/useAddItem";
import Button from "@/components/common/Button";
import { divideArray, nativeArray } from "@/data/itemData";
import ItemInput from "./ItemInput";
import ItemSelect from "./ItemSelect";
import './AddItem.scss';

function AddItem() {
  const { form, onBack, onChange, onAddItem, onKeyPress, isUpdate } = useAddItem();

  return (
    <div className="add-item-container">
      <div className="add-item-logo">
        품목 등록
      </div>

      <form className="add-item-form">
        <ItemInput
          name="name"
          value={form.name}
          onChange={onChange}
          label="품 명"
          focus
        />
        <ItemSelect
          name="divide"
          value={form.divide}
          onChange={onChange}
          data={divideArray}
        />
        <ItemSelect
          name="native"
          value={form.native}
          onChange={onChange}
          data={nativeArray}
        />
        <ItemInput
          name="unit"
          value={form.unit}
          onChange={onChange}
          label="단 위"
        />
        <ItemInput
          name="price"
          value={form.price}
          onChange={onChange}
          label="단 가"
          onKeyPress={onKeyPress}
        />

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
};

export default AddItem;