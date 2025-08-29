import './SignPane.scss';

interface Props {
  husband_image?: string;
  bride_image?: string;
  onRemoveHusbandSign: () => void;
  onRemoveBrideSign: () => void;
}

function SignPane({ husband_image, bride_image, onRemoveHusbandSign, onRemoveBrideSign }: Props) {
  return (
    <div className="sign-pane-container">
      <div className="sign-pane-contents">
        <div className="sign-pane-content" onClick={onRemoveHusbandSign}>
          <label>신랑님 서명</label>
          {husband_image && <img src={husband_image} alt="신랑 서명" />}
          {husband_image && <span className="remove-text">클릭하여 삭제</span>}
        </div>

        <div className="sign-pane-content" onClick={onRemoveBrideSign}>
          <label>신부님 서명</label>
          {bride_image && <img src={bride_image} alt="신부 서명" />}
          {bride_image && <span className="remove-text">클릭하여 삭제</span>}
        </div>
      </div>
    </div>
  );
}

export default SignPane;
