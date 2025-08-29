import { useAddWedding } from '../../../libs/hooks/useAddWedding';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import AddWeddingButtons from './AddWeddingButtons';
import AddWeddingContents from './AddWeddingContents';
import './AddWedding.scss';

function AddWedding() {
  const {
    form,
    loading,
    error,
    onBack,
    onChange,
    onAddWedding,
    onKeyDown,
    onChangeDate,
    onChangeTime,
    isUpdate,
  } = useAddWedding();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="add-wedding-container">
      <div className="add-wedding-title">웨딩 정산 {isUpdate ? '수정' : '작성'}</div>

      <AddWeddingContents
        form={form}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onChangeDate={onChangeDate}
        onChangeTime={onChangeTime}
      />

      <AddWeddingButtons onBack={onBack} onAddWedding={onAddWedding} />
    </div>
  );
}

export default AddWedding;
