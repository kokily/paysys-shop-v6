import { useCart } from "@/hooks/useCart";
import './ViewCart.scss';
import Button from "../common/Button";
import CartTop from "./CartTop";
import CartTotal from "./CartTotal";
import CartInputs from "./CartInputs";

function ViewCart() {
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
    return (
      <div className="menu-error">
        <p>에러 발생: {error}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="menu-loading">
        <p>로딩 중...</p>
      </div>
    );
  };

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
  )
}

export default ViewCart;