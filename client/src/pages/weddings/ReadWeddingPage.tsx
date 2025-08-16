import PageTemplate from "@/components/common/PageTemplate";
import ReadWedding from "@/components/wedding/ReadWedding";
import { Helmet } from "react-helmet-async";

function ReadWeddingsPage() {
  return (
    <>
      <Helmet>
        <title>웨딩 상세 보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadWedding />
      </PageTemplate>
    </>
  );
};

export default ReadWeddingsPage;