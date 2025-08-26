import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import AddItem from '../../components/item/add/AddItem';

function UpdateItemsPage() {
  return (
    <>
      <Helmet>
        <title>품목 수정 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <AddItem />
      </PageTemplate>
    </>
  );
}

export default UpdateItemsPage;
