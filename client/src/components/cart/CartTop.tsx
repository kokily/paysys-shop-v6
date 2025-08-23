import type { CartType } from '../../types/cart.types';
import { unitOfAccount } from '../../libs/data/utils';
import Button from '../common/button/Button';

import './CartTop.scss';

interface Props {
  cart: CartType;
  onRemoveOne: (id: string, name: string) => void;
}

function CartTop({ cart, onRemoveOne }: Props) {
  return (
    <>
      <h2>전표 확인(종합)</h2>

      <table className="cart-top-container">
        <thead>
          <tr>
            <th>적용</th>
            <th>수량</th>
            <th>단가</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.items &&
            cart.items.map((item) => (
              <tr key={item.id}>
                <td>
                  [ {item.native} ]<br />
                  {item.divide}
                </td>
                <td>{unitOfAccount(item.count, item.unit)}</td>
                <td>
                  {unitOfAccount(item.price, '원')} /<br />
                  <strong>{unitOfAccount(item.amount, '원')}</strong>
                </td>
                <td>
                  <Button
                    variant="cancel"
                    size="small"
                    onClick={() => onRemoveOne(item.id, item.name)}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}

          {!cart && (
            <tr>
              <td colSpan={4}>데이터가 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default CartTop;
