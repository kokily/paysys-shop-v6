import type { WeddingType } from '../../../types/wedding.types';
import { unitOfDate } from '../../../libs/data/utils';
import { useWeddingPane } from '../../../libs/hooks/useWeddingPane';
import SignPane from './pane/SignPane';
import './WeddingPane.scss';

interface Props {
  wedding: WeddingType;
}

function WeddingPane({ wedding }: Props) {
  const { onHusbandSignModal, onBrideSignModal, onRemoveHusbandSign, onRemoveBrideSign } = useWeddingPane({
    wedding,
  });

  return (
    <div className="wedding-pane-container">
      <h2 className="wedding-pane-title">웨딩 정산내역</h2>

      <h3 className="wedding-pane-names">
        신랑님:{' '}
        <strong className="select" onClick={onHusbandSignModal}>
          {wedding.husband_name}
        </strong>{' '}
        <strong className="heart">♡</strong> 신부님:{' '}
        <strong className="select" onClick={onBrideSignModal}>
          {wedding.bride_name}
        </strong>
      </h3>

      {(wedding.husband_image || wedding.bride_image) && (
        <SignPane
          husband_image={wedding.husband_image}
          bride_image={wedding.bride_image}
          onRemoveHusbandSign={onRemoveHusbandSign}
          onRemoveBrideSign={onRemoveBrideSign}
        />
      )}

      <h4 className="wedding-pane-date">
        웨딩일시: {unitOfDate(wedding.wedding_at)} {wedding.event_at}
      </h4>

      <hr />

      <h3 className="wedding-pane-sub-title">웨딩 비용</h3>
    </div>
  );
}

export default WeddingPane;
