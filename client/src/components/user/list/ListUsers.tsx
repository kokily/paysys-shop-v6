import { useListUsers } from '../../../libs/hooks/useListUsers';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import Search from '../../common/search/Search';
import UsersTable from './UsersTable';
import './ListUsers.scss';

function ListUsers() {
  const { users, loading, error, username, onReadUser, onChange, onSearchUsername, setTarget } =
    useListUsers();

  if (error) {
    const code = error.slice(-3, error.length);
    return <Error code={code} message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="list-users-container">
      <h1>사용자 리스트</h1>

      <Search
        value={username}
        onChange={onChange}
        onSearch={onSearchUsername}
        placeholder="이름을 검색하세요"
      />

      <UsersTable users={users} onReadUser={onReadUser} />

      <div ref={setTarget} className="observer" />
    </div>
  );
}

export default ListUsers;
