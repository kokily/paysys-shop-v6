import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';

function ReadFrontPage() {
  return (
    <>
      <Helmet>
        <title>행사 전표 상세보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>ReadFrontPage</PageTemplate>
    </>
  );
}

export default ReadFrontPage;
