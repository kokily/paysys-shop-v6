import { Helmet } from 'react-helmet-async';
import PageTemplate from '../../components/common/PageTemplate';
import Cart from '../../components/cart/Cart';

function CartPage() {
  return (
    <>
      <Helmet>
        <title>전표확인 - 행사전표시스템 v6.0</title>
      </Helmet>
      <PageTemplate>
        <Cart />
      </PageTemplate>
    </>
  );
}

export default CartPage;
