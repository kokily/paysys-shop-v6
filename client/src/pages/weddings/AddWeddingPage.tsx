import PageTemplate from "@/components/common/PageTemplate";
import AddWedding from "@/components/weddings/add/AddWedding";
import { Helmet } from "react-helmet-async";

function AddWeddingsPage() {
  return (
    <>
      <Helmet>
        <title>웨딩 빌지 작성 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <AddWedding />
      </PageTemplate>
    </>
  );
};

export default AddWeddingsPage;