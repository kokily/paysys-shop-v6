import type { UserType } from '../../../types/user.types';
import { unitOfDate } from '../../../libs/data/utils';
import './UsersTable.scss';

interface Props {
  users: UserType[];
  onReadUser: (id: string) => void;
}

function UsersTable({ users, onReadUser }: Props) {
  return (
    <div className="users-table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>성명</th>
            <th>가입일</th>
            <th>관리자</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, idx) => (
              <tr key={`${user.id}-${idx}`} onClick={() => onReadUser(user.id)}>
                <td>{user.username}</td>
                <td>{unitOfDate(user.created_at)}</td>
                <td>{user.admin ? '관리자' : '일반'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>사용자가 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
