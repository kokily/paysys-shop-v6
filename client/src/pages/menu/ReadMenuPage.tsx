import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import ReadMenu from '../../components/menu/read/ReadMenu';

function ReadMenuPage() {
  return (
    <>
      <Helmet>
        <title>메뉴 상세보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadMenu />
      </PageTemplate>
    </>
  );
}

export default ReadMenuPage;
