import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import '../styles/pages/Auth.scss';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await authApi.login({ username, password });
      login(response.user, response.access_token);

      // 무조건 /member로 이동
      navigate('/member');

      toast.success('로그인 성공!');
    } catch (error: any) {
      const message = error.response?.data || '로그인에 실패했습니다.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate mode="login">
      <AuthForm
        mode="login"
        username={username}
        password={password}
        onChange={handleChange}
        onLogin={handleLogin}
        isLoading={isLoading}
      />
    </AuthTemplate>
  );
};

export default LoginPage; 