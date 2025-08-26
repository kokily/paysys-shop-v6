import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ListItems from '../../components/item/list/ListItems';

function ListItemsPage() {
  return (
    <>
      <Helmet>
        <title>품목 리스트 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ListItems />
      </PageTemplate>
    </>
  );
}

export default ListItemsPage;
