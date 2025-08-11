import PageTemplate from "@/components/common/PageTemplate";
import { Helmet } from "react-helmet-async";

function CartPage() {
  return (
    <>
      <Helmet>
        <title>전표확인 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        전표확인 페이지
      </PageTemplate>
    </>
  )
}

export default CartPage;