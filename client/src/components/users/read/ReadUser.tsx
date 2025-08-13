import { useReadUser } from "@/hooks/useReadUser";
import './ReadUser.scss';
import UserButtons from "./UserButtons";
import UserContent from "./UserContent";

function ReadUser() {
  const {
    user,
    loading,
    error,
    onBack,
    onSetAdmin,
    onModalClick
  } = useReadUser();

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
    <div className="read-user-container">
      <div className="read-user-contents">
        <h2>사용자 상세보기</h2>

        <div className="read-user-down-border" />

        <UserButtons onBack={onBack} onModalClick={onModalClick} onSetAdmin={onSetAdmin} />

        {user && <UserContent user={user} />}
      </div>
    </div>
  );
};

export default ReadUser;