import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ListFronts from '../../components/front/list/ListFronts';

function ListFrontsPage() {
  return (
    <>
      <Helmet>
        <title>행사 전표 리스트 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ListFronts />
      </PageTemplate>
    </>
  );
}

export default ListFrontsPage;
