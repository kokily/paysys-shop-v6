import { Helmet } from "react-helmet-async";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>로그인 - 행사전표시스템 v6.0</title>
      </Helmet>
      <LoginForm />
    </>
  );
};

export default LoginPage;