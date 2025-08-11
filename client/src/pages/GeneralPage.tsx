import PageTemplate from "@/components/common/PageTemplate";
import Native from "@/components/native/Native";
import { Helmet } from "react-helmet-async";

function GeneralPage() {
  return (
    <>
      <Helmet>
        <title>일반 페이지 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <Native />
      </PageTemplate>
    </>
  )
}

export default GeneralPage;