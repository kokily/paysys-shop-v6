import PageTemplate from "@/components/common/PageTemplate";
import { Helmet } from "react-helmet-async";

function MemberPage() {
  return (
    <>
      <Helmet>
        <title>회원 페이지 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        회원 페이지
      </PageTemplate>
    </>
  )
}

export default MemberPage;