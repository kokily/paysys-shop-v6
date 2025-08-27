import { useCart } from '../../libs/hooks/useCart';
import Button from '../common/button/Button';
import Error from '../common/Error';
import Loading from '../common/Loading';
import CartInputs from './CartInputs';
import CartTop from './CartTop';
import CartTotal from './CartTotal';
import './Cart.scss';

function Cart() {
  const {
    cart,
    title,
    hall,
    etc,
    totalAmount,
    loading,
    error,
    onChange,
    onAddBill,
    onRemoveOneCart,
    onModalClick,
  } = useCart();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cart-container">
      <CartTop cart={cart!} onRemoveOne={onRemoveOneCart} />
      <CartTotal totalAmount={totalAmount} />

      <form className="cart-form">
        <CartInputs title={title} hall={hall} etc={etc} onChange={onChange} />

        <Button variant="submit" onClick={onAddBill}>
          전송하기
        </Button>
        <Button variant="cancel" onClick={onModalClick}>
          전체삭제
        </Button>
      </form>
    </div>
  );
}

export default Cart;
