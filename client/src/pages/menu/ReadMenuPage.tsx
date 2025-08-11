import PageTemplate from "@/components/common/PageTemplate";
import ReadMenu from "@/components/menu/read/ReadMenu";
import { Helmet } from "react-helmet-async";

function ReadMenuPage() {
  return (
    <>
      <Helmet>
        <title>메뉴 상세 페이지 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadMenu />
      </PageTemplate>
    </>
  );
};

export default ReadMenuPage;
