import type { BillType } from "@/types/bill.types";
import './FrontButtons.scss';
import type { User } from "@/types/auth.types";
import Button from "../common/Button";

interface Props {
  front: BillType;
  user: User;
  onBack: () => void;
  onRestore: () => void;
  onReservePage: () => void;
  onRemoveReserve: () => void;
  onModalClick: () => void;
}

function FrontButtons({
  front,
  user,
  onBack,
  onRestore,
  onReservePage,
  onRemoveReserve,
  onModalClick,
}: Props) {
  console.log(user.admin);

  return (
    <div className="front-buttons-container">
      <div className="front-buttons-box">
        {(user.admin || user.user_id === front.user_id) && (
          <>
            <Button variant="cancel" onClick={onModalClick}>
              삭 제
            </Button>
            <Button variant="edit" onClick={onRestore}>
              수 정
            </Button>
          </>
        )}
        <Button variant="menu" onClick={onBack}>
          목 록
        </Button>
        {user.admin && (
          <>
            {!front.reserve || front.reserve === 0 ? (
              <Button variant="reserve" onClick={onReservePage}>
                + 예약금
              </Button>
            ):(
              <Button variant="reserve" onClick={onRemoveReserve}>
                예약금 삭제
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FrontButtons;