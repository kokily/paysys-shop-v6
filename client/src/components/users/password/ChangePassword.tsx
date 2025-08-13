import { useChangePassword } from '@/hooks/useChangePassword';
import './ChangePassword.scss';
import PasswordTable from './PasswordTable';
import PasswordButtons from './PasswordButtons';

function ChangePassword() {
  const {
    form,
    loading,
    error,
    onBack,
    onChange,
    onSubmit
  } = useChangePassword();

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
    <div className="password-container">
      <div className="password-logobox">
        <h2>비밀번호 변경</h2>
      </div>

      <PasswordTable form={form} onChange={onChange} onSubmit={onSubmit} />

      <PasswordButtons loading={loading} onBack={onBack} onSubmit={onSubmit} />
    </div>
  )
}

export default ChangePassword;