import { useAddWedding } from '@/hooks/useAddWedding';
import AddWeddingButtons from './AddWeddingButtons';
import WeddingContents from './contents/WeddingContents';
import './AddWedding.scss';

function AddWedding() {
  const {
    form,
    loading,
    error,
    onBack,
    onChange,
    onAddWedding,
    onKeyPress,
    onChangeDate,
    onChangeTime,
    isUpdate
  } = useAddWedding();

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
    <div className='add-wedding-container'>
      <div className='add-wedding-title'>
        웨딩 정산 {isUpdate ? '수정' : '작성'}
      </div>

      <WeddingContents
        form={form}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onChangeDate={onChangeDate}
        onChangeTime={onChangeTime}
      />
      <AddWeddingButtons onBack={onBack} onAddWedding={onAddWedding} />
    </div>
  );
};

export default AddWedding;