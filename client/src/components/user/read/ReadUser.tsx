import { useReadUser } from '../../../libs/hooks/useReadUser';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import UserButtons from './UserButtons';
import UserContent from './UserContent';
import './ReadUser.scss';

function ReadUser() {
  const { user, loading, error, onBack, onSetAdmin, onModalClick } = useReadUser();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="read-user-container">
      <div className="read-user-content">
        <h2>사용자 상세보기</h2>

        <div className="read-user-downborder" />

        <UserButtons onBack={onBack} onSetAdmin={onSetAdmin} onModalClick={onModalClick} />

        {user && <UserContent user={user} />}
      </div>
    </div>
  );
}

export default ReadUser;
