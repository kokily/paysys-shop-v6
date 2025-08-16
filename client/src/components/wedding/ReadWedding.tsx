import { useReadWedding } from '@/hooks/useReadWedding';
import './ReadWedding.scss';
import WeddingButtons from './WeddingButtons';
import WeddingPane from './WeddingPane';
import ReadWeddingFirst from './tables/ReadWeddingFirst';
import ReadWeddingSecond from './tables/ReadWeddingSecond';

function ReadWedding() {
  const {
    wedding,
    loading,
    error,
    onBack,
    onUpdateWeddingPage,
    onModalClick,
  } = useReadWedding();

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
    <div className='read-wedding-container'>
      {wedding && (
        <>
          {/* 서명 useSign Todo... */}
          <WeddingPane wedding={wedding} />

          <div className='read-wedding-contents'>
            <ReadWeddingFirst wedding={wedding} />
            <ReadWeddingSecond wedding={wedding} />
          </div>

          <div className='read-wedding-contents'>
            <div>ReadWedding Result</div>
          </div>

          <WeddingButtons
            onBack={onBack}
            onUpdateWeddingPage={onUpdateWeddingPage}
            onModalClick={onModalClick}
          />
        </>
      )}
    </div>
  );
};

export default ReadWedding;