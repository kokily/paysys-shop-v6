import type { WeddingType } from '../../../../types/wedding.types';
import { convertWeddingToReserve, convertWeddingToText, unitOfAccount } from '../../../../libs/data/utils';
import './CommonContents.scss';

interface Props {
  wedding: WeddingType;
}

function SecondContents({ wedding }: Props) {
  const { meal_method, present_method, reserve_method } = convertWeddingToText(wedding);
  const { husband_reserve, bride_reserve } = convertWeddingToReserve(wedding);

  return (
    <table className="second-contents-container">
      <thead>
        <tr>
          <th colSpan={4}>식사비용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>구 분</th>
          <th className="basic white">신랑</th>
          <th className="basic white">신부</th>
          <th className="basic white">계</th>
        </tr>

        <tr>
          <th>식대분할</th>
          <td className="center" colSpan={3}>
            {meal_method}
          </td>
        </tr>

        <tr>
          <th>식대단가</th>
          <td className="center" colSpan={3}>
            {unitOfAccount(wedding.meal_price, '원')}
          </td>
        </tr>

        <tr>
          <th>하객인원</th>
          <td className="center">{unitOfAccount(wedding.husband_meal, '명')}</td>
          <td className="center">{unitOfAccount(wedding.bride_meal, '명')}</td>
          <td className="center">{unitOfAccount(wedding.husband_meal + wedding.bride_meal, '명')}</td>
        </tr>

        <tr>
          <th className="white result">총 식사비용</th>
          <td className="result">{unitOfAccount(wedding.meal_price * wedding.husband_meal, '원')}</td>
          <td className="result">{unitOfAccount(wedding.meal_price * wedding.bride_meal, '원')}</td>
          <td className="sub-result">
            {unitOfAccount(wedding.meal_price * (wedding.husband_meal + wedding.bride_meal), '원')}
          </td>
        </tr>

        <tr>
          <th colSpan={4}>답례품 비용</th>
        </tr>

        <tr>
          <th>답례품 분할</th>
          <td className="center" colSpan={3}>
            {present_method}
          </td>
        </tr>

        <tr>
          <th>답례품 단가</th>
          <td className="center" colSpan={3}>
            {unitOfAccount(wedding.present_price, '원')}
          </td>
        </tr>

        <tr>
          <th>하객인원</th>
          <td className="center">{unitOfAccount(wedding.husband_present, '명')}</td>
          <td className="center">{unitOfAccount(wedding.bride_present, '명')}</td>
          <td className="center">{unitOfAccount(wedding.husband_present + wedding.bride_present, '명')}</td>
        </tr>

        <tr>
          <th className="white result">답례품 총 비용</th>
          <td className="result">{unitOfAccount(wedding.present_price * wedding.husband_present, '원')}</td>
          <td className="result">{unitOfAccount(wedding.present_price * wedding.bride_present, '원')}</td>
          <td className="sub-result">
            {unitOfAccount(wedding.present_price * (wedding.husband_present + wedding.bride_present), '원')}
          </td>
        </tr>

        <tr>
          <th colSpan={4}>예약금</th>
        </tr>

        <tr>
          <th>예약금 분할</th>
          <td className="center" colSpan={3}>
            {reserve_method}
          </td>
        </tr>

        <tr>
          <th>예약금</th>
          <td>{unitOfAccount(husband_reserve, '원')}</td>
          <td>{unitOfAccount(bride_reserve, '원')}</td>
          <td>{unitOfAccount(husband_reserve + bride_reserve, '원')}</td>
        </tr>

        <tr>
          <th>선 입금</th>
          <td>{unitOfAccount(wedding.husband_pre_deposit, '원')}</td>
          <td>{unitOfAccount(wedding.bride_pre_deposit, '원')}</td>
          <td>{unitOfAccount(wedding.husband_pre_deposit + wedding.bride_pre_deposit, '원')}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SecondContents;
