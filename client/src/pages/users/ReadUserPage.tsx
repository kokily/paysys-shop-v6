import { Helmet } from "react-helmet-async";
import PageTemplate from "@/components/common/PageTemplate";
import ReadUser from "@/components/users/read/ReadUser";

function ReadUserPage() {
  return (
    <>
      <Helmet>
        <title>사용자 상세 정보 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadUser />
      </PageTemplate>
    </>
  );
};

export default ReadUserPage;