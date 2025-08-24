import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ChangePassword from '../../components/password/ChangePassword';

function ChangePasswordPage() {
  return (
    <>
      <Helmet>
        <title>비밀번호 변경 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ChangePassword />
      </PageTemplate>
    </>
  );
}

export default ChangePasswordPage;
