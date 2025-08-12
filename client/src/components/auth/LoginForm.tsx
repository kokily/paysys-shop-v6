import type { ChangeEvent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync, updateForm } from '../../store/slices/authSlice';
import { showToast } from '../../utils/toast';
import './LoginForm.scss';

function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error, form } = useAppSelector((state) => state.auth);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      showToast.warning('사용자와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await dispatch(loginAsync(form)).unwrap();
      showToast.success('로그인되었습니다.');
    } catch (error) {
      showToast.error(`로그인 실패: ${error}`);
      console.error('Login Failed: ', error);
    }
  }

  return (
    <div className='login-form'>
      <div className='login-logo'>
        <Link to="/" className='login-anchor'>
          로그인
        </Link>
      </div>
      <div className='login-form-container'>
        <form onSubmit={handleSubmit}>
          <div className='login-form-group'>
            <input
              className='auth-input'
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <span className='login-form-bar' />
            <label htmlFor='username' className='login-form-input-label'>사용자 이름</label>
          </div>
          <div className='login-form-group'>
            <input
              className='auth-input'
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className='login-form-bar' />
            <label htmlFor='password' className='login-form-input-label'>비밀번호</label>
          </div>

          <button
            type="submit"
            className='login-submit-button'
            disabled={loading}
          >
            <div className='button-layer'>어서오세요!</div>
            {loading ? '로그인 중...' : '로 그 인'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;