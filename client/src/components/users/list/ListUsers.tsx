import Search from '@/components/common/Search';
import './ListUsers.scss';
import { useListUsers } from '@/hooks/useListUsers';
import UsersTable from './UsersTable';

function ListUsers() {
  const {
    users,
    loading,
    error,
    search,
    hasMore,
    onChange,
    onSearch,
    onReadUser,
    setTarget
  } = useListUsers();

  return (
    <div className="list-users-container">
      <h1>사용자 리스트</h1>

      <Search
        value={search}
        onChange={onChange}
        onSearch={onSearch}
        placeholder='이름을 검색하세요'
      />

      <UsersTable users={users} onReadUser={onReadUser} />

      {loading && <div>로딩 중...</div>}

      <div ref={setTarget} className="observer" />
    </div>
  );
};

export default ListUsers;