import { Helmet } from 'react-helmet-async';
import Home from '../../components/home/Home';
import PageTemplate from '../../components/common/PageTemplate';

function AssociatePage() {
  return (
    <>
      <Helmet>
        <title>준회원 페이지 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <Home />
      </PageTemplate>
    </>
  );
}

export default AssociatePage;
