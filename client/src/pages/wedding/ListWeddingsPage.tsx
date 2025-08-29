import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ListWeddings from '../../components/wedding/list/ListWeddings';

function ListWeddingsPage() {
  return (
    <>
      <Helmet>
        <title>웨딩전표 리스트 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ListWeddings />
      </PageTemplate>
    </>
  );
}

export default ListWeddingsPage;
