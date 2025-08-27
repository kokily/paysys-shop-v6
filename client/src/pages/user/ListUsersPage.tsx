import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ListUsers from '../../components/user/list/ListUsers';

function ListUsersPage() {
  return (
    <>
      <Helmet>
        <title>사용자 리스트 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ListUsers />
      </PageTemplate>
    </>
  );
}

export default ListUsersPage;
