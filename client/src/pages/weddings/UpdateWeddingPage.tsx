import PageTemplate from "@/components/common/PageTemplate";
import AddWedding from "@/components/weddings/add/AddWedding";
import { Helmet } from "react-helmet-async";

function UpdateWeddingsPage() {
  return (
    <>
      <Helmet>
        <title>웨딩 빌지 수정 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <AddWedding />
      </PageTemplate>
    </>
  );
};

export default UpdateWeddingsPage;