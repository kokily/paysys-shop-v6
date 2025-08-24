import type { SyntheticEvent } from 'react';
import './PasswordButtons.scss';
import Button from '../common/button/Button';

interface Props {
  onBack: () => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

function PasswordButtons({ onBack, onChangePassword }: Props) {
  return (
    <div className="password-buttons-container">
      <Button variant="cancel" onClick={onBack}>
        뒤 로
      </Button>
      <Button variant="submit" onClick={onChangePassword}>
        변 경
      </Button>
    </div>
  );
}

export default PasswordButtons;
