import { Link } from 'react-router-dom';
import { useAuth } from '../../libs/hooks/useAuth';
import Loading from '../common/Loading';
import Error from '../common/Error';
import './Login.scss';

function Login() {
  const { form, loading, error, onChange, onLogin } = useAuth();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <div className="login-logo">
        <Link to="/" className="login-logo-anchor">
          로그인
        </Link>
      </div>

      <div className="login-form-container">
        <form onSubmit={onLogin}>
          <div className="login-form-group">
            <input
              className="login-form-input"
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={onChange}
              required
            />
            <span className="login-form-bar" />
            <label className="login-form-input-label" htmlFor="username">
              사용자 이름
            </label>
          </div>

          <div className="login-form-group">
            <input
              className="login-form-input"
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
            />
            <span className="login-form-bar" />
            <label className="login-form-input-label" htmlFor="password">
              비밀번호
            </label>
          </div>

          <button type="submit" className="login-submit-button" disabled={loading}>
            <div className="button-layer">어서오세요!</div>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
