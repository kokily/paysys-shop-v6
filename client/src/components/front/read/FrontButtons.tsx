import { useMobileSimple } from '../../../libs/hooks/useMobile';
import type { User } from '../../../types/auth.types';
import type { BillType } from '../../../types/bill.types';
import Button from '../../common/button/Button';
import './FrontButtons.scss';

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
  const isMobile = useMobileSimple();

  return (
    <div className="front-buttons-container">
      <div className="front-buttons-contents">
        {(user.admin || user.id === front.user_id) && (
          <>
            <Button variant="cancel" onClick={onModalClick} size={isMobile ? 'small' : 'medium'}>
              삭 제
            </Button>
            <Button variant="edit" onClick={onRestore} size={isMobile ? 'small' : 'medium'}>
              수 정
            </Button>
          </>
        )}

        <Button variant="menu" onClick={onBack} size={isMobile ? 'small' : 'medium'}>
          목 록
        </Button>
        {user.admin && (
          <>
            {!front.reserve || front.reserve === 0 ? (
              <Button variant="reserve" onClick={onReservePage} size={isMobile ? 'small' : 'medium'}>
                + 예약금
              </Button>
            ) : (
              <Button variant="reserve" onClick={onRemoveReserve} size={isMobile ? 'small' : 'medium'}>
                예약금 삭제
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FrontButtons;
