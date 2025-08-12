import PageTemplate from "@/components/common/PageTemplate";
import ListFronts from "@/components/fronts/ListFronts";
import { Helmet } from "react-helmet-async";

function ListFrontsPage() {
  return (
    <>
      <Helmet>
        <title>빌지목록 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ListFronts />
      </PageTemplate>
    </>
  )
}

export default ListFrontsPage;