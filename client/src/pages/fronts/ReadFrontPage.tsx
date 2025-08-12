import PageTemplate from "@/components/common/PageTemplate";
import ReadFront from "@/components/front/ReadFront";
import { Helmet } from "react-helmet-async";

function ReadFrontPage() {
  return (
    <>
      <Helmet>
        <title>빌지 상세 페이지 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadFront />
      </PageTemplate>
    </>
  )
}

export default ReadFrontPage;