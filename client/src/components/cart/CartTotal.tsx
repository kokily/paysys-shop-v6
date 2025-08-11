import { unitOfAccount } from "@/utils/menuUtils";
import './CartTotal.scss';

interface Props {
  totalAmount: number;
}

function CartTotal({ totalAmount }: Props) {
  return (
    <div className="cart-total-container">
      <div className="cart-total">
        예상 결제금액 :{' '}
        <span className="cart-value">
          {unitOfAccount(totalAmount)}
        </span>
        원
      </div>
    </div>
  )
}

export default CartTotal;