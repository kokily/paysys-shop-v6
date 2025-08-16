import PageTemplate from "@/components/common/PageTemplate";
import ListWeddings from "@/components/weddings/list/ListWeddings";
import { Helmet } from "react-helmet-async";

function ListWeddingsPage() {
  return (
    <>
      <Helmet>
        <title>웨딩 빌지 리스트 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ListWeddings />
      </PageTemplate>
    </>
  );
};

export default ListWeddingsPage;