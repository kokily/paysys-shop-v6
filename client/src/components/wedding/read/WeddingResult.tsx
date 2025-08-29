import type { WeddingType } from '../../../types/wedding.types';
import { convertWeddingToAllCost, unitOfAccount } from '../../../libs/data/utils';
import './WeddingResult.scss';

interface Props {
  wedding: WeddingType;
}

function WeddingResult({ wedding }: Props) {
  const { all_cost, all_payment, husband_payment, bride_payment } = convertWeddingToAllCost(wedding);

  return (
    <table className="wedding-result-container">
      <tbody>
        <tr>
          <td colSpan={4} rowSpan={9}>
            <h3 className="all-cost">웨딩 총 비용: {unitOfAccount(all_cost, '원')}</h3>
            <h3 className="all-payment">결제 총 비용: {unitOfAccount(all_payment, '원')}</h3>
            <h3>신랑 총 비용: {unitOfAccount(husband_payment, '원')}</h3>
            <h3>신부 총 비용: {unitOfAccount(bride_payment, '원')}</h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default WeddingResult;
