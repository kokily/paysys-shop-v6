import { Helmet } from 'react-helmet-async';
import Login from '../../components/auth/Login';

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>서비스 로그인 - 행사전표시스템 v6.0</title>
      </Helmet>
      <Login />
    </>
  );
}

export default LoginPage;
