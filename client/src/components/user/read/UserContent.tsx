import type { UserType } from '../../../types/user.types';
import { unitOfDate } from '../../../libs/data/utils';
import './UserContent.scss';

interface Props {
  user: UserType;
}

function UserContent({ user }: Props) {
  return (
    <div className="user-content-container">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>등급</th>
            <td>{user.admin ? '관리자' : '일반'}</td>
          </tr>
          <tr>
            <th>성명</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th>가입일</th>
            <td>{unitOfDate(user.created_at)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserContent;
