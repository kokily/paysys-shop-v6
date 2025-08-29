import { useReadWedding } from '../../../libs/hooks/useReadWedding';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import FirstContents from './contents/FirstContents';
import SecondContents from './contents/SecondContents';
import './ReadWedding.scss';
import WeddingButtons from './WeddingButtons';
import WeddingPane from './WeddingPane';
import WeddingResult from './WeddingResult';

function ReadWedding() {
  const { wedding, loading, error, onBack, onUpdateWeddingPage, onModalClick } = useReadWedding();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="read-wedding-container">
      {wedding && (
        <>
          <WeddingPane wedding={wedding} />

          <div className="read-wedding-contents">
            <FirstContents wedding={wedding} />
            <SecondContents wedding={wedding} />
          </div>

          <div className="read-wedding-contents">
            <WeddingResult wedding={wedding} />
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
}

export default ReadWedding;
