import PageTemplate from "@/components/common/PageTemplate";
import ReadItem from "@/components/item/ReadItem";
import { Helmet } from "react-helmet-async";

function ReadItemPage() {
  return (
    <>
      <Helmet>
        <title>품목 상세보기 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ReadItem />
      </PageTemplate>
    </>
  );
};

export default ReadItemPage;