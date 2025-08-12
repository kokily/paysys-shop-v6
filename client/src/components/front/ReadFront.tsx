import { useReadBill } from "@/hooks/useReadBill";
import './ReadFront.scss';
import FrontHeader from "./FrontHeader";
import FrontTable from "./FrontTable";
import FrontEtc from "./FrontEtc";
import FrontTotal from "./FrontTotal";
import FrontButtons from "./FrontButtons";

function ReadFront() {
  const {
    bill,
    user,
    loading,
    error,
    onBack,
    onRestore,
    onReservePage,
    onRemoveReserve,
    onModalClick,
  } = useReadBill();

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
    <div className="read-front-container">
      {bill && (
        <div className="read-front-contents">
          <FrontHeader front={bill} />
          <FrontTable front={bill} />

          {bill.etc !== '' && bill.etc != ' ' && (
            <FrontEtc etc={bill.etc} />
          )}

          <hr />

          <FrontTotal front={bill} />

          <FrontButtons
            front={bill}
            user={user!}
            onBack={onBack}
            onRestore={onRestore}
            onReservePage={onReservePage}
            onRemoveReserve={onRemoveReserve}
            onModalClick={onModalClick}
          />
        </div>
      )}
    </div>
  );
};

export default ReadFront;