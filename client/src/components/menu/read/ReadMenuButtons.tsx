import type { SyntheticEvent } from "react";
import Button from "@/components/common/Button";
import './ReadMenuButtons.scss';

interface Props {
  onAddCart: (e: SyntheticEvent) => void;
  onBack: () => void;
}

function ReadMenuButton({ onAddCart, onBack }: Props) {
  return (
    <div className="read-menu-buttons">
      <Button variant="submit" onClick={onAddCart}>
        전표전송
      </Button>
      <Button variant="cancel" onClick={onBack}>
        취소하기
      </Button>
    </div>
  )
}

export default ReadMenuButton;