import { unitOfAccount } from '../../libs/data/utils';
import './CartTotal.scss';

interface Props {
  totalAmount: number;
}

function CartTotal({ totalAmount }: Props) {
  return (
    <div className="cart-total-container">
      <div className="cart-total">
        예상 결제금액 : <span className="cart-value">{unitOfAccount(totalAmount, '원')}</span>
      </div>
    </div>
  );
}

export default CartTotal;
