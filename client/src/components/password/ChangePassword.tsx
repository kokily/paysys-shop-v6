import { useChangePassword } from '../../libs/hooks/useChangePassword';
import Error from '../common/Error';
import Loading from '../common/Loading';
import PasswordButtons from './PasswordButtons';
import PasswordTable from './PasswordTable';
import './ChangePassword.scss';

function ChangePassword() {
  const { form, loading, error, onBack, onChange, onChangePassword, onKeyDown } = useChangePassword();

  if (error) {
    return <Error code="500" message="알 수 없는 오류" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="change-password-container">
      <div className="change-password-logo">
        <h2>비밀번호 변경</h2>
      </div>

      <PasswordTable form={form} onChange={onChange} onKeyDown={onKeyDown} />
      <PasswordButtons onBack={onBack} onChangePassword={onChangePassword} />
    </div>
  );
}

export default ChangePassword;
