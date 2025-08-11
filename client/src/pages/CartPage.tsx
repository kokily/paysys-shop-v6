import ViewCart from "@/components/cart/ViewCart";
import PageTemplate from "@/components/common/PageTemplate";
import { Helmet } from "react-helmet-async";

function CartPage() {
  return (
    <>
      <Helmet>
        <title>전표확인 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <ViewCart />
      </PageTemplate>
    </>
  )
}

export default CartPage;