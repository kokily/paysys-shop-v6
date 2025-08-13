import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from "react";
import './PasswordTable.scss';

interface Props {
  form: {
    password: string;
    confirmPassword: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: SyntheticEvent) => void;
}

function PasswordTable({ form, onChange, onSubmit }: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    };
  };

  return (
    <div className="password-table-container">
      <table className="password-table">
        <tbody>
          <tr>
            <th>새 비밀번호</th>
            <td>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <th>비밀번호 확인</th>
            <td>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PasswordTable;