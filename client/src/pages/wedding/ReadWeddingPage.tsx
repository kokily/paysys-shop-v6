import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ReadWedding from '../../components/wedding/read/ReadWedding';

function ReadWeddingsPage() {
  return (
    <>
      <Helmet>
        <title>웨딩 상세보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadWedding />
      </PageTemplate>
    </>
  );
}

export default ReadWeddingsPage;
