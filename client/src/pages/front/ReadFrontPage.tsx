import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ReadFront from '../../components/front/read/ReadFront';

function ReadFrontPage() {
  return (
    <>
      <Helmet>
        <title>행사 전표 상세보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadFront />
      </PageTemplate>
    </>
  );
}

export default ReadFrontPage;
