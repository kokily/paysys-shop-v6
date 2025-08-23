import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ListMenu from '../../components/menu/list/ListMenu';

function ListMenuPage() {
  return (
    <>
      <Helmet>
        <title>메뉴 목록 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ListMenu />
      </PageTemplate>
    </>
  );
}

export default ListMenuPage;
