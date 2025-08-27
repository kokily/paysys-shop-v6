import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ReadUser from '../../components/user/read/ReadUser';

function ReadUsersPage() {
  return (
    <>
      <Helmet>
        <title>사용자 상세 보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadUser />
      </PageTemplate>
    </>
  );
}

export default ReadUsersPage;
