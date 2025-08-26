import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ReadItem from '../../components/item/read/ReadItem';

function ReadItemsPage() {
  return (
    <>
      <Helmet>
        <title>품목 상세보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadItem />
      </PageTemplate>
    </>
  );
}

export default ReadItemsPage;
