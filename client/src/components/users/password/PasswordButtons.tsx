import type { SyntheticEvent } from "react";
import './PasswordButtons.scss';
import Button from "@/components/common/Button";

interface Props {
  loading: boolean;
  onBack: () => void;
  onSubmit: (e: SyntheticEvent) => void;
}

function PasswordButtons({ loading, onBack, onSubmit }: Props) {
  return (
    <div className="password-buttons-container">
      <Button variant="submit" onClick={onSubmit}>
        {loading ? '처리중...' : '확 인'}
      </Button>
      <Button variant="cancel" onClick={onBack}>
        취 소
      </Button>
    </div>
  )
}

export default PasswordButtons;