import type { WeddingType } from '@/types/wedding.types';
import './ReadWeddingCommon.scss';
import { unitOfAccount } from '@/utils/menuUtils';

interface Props {
  wedding: WeddingType;
}

function ReadWeddingSecond({ wedding }: Props) {
  return (
    <table className='read-wedding-second-container'>
      <thead>
        <tr>
          <th colSpan={4}>식사비용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>구 분</th>
          <th className='basic white'>신랑</th>
          <th className='basic white'>신부</th>
          <th className='basic white'>계</th>
        </tr>

        <tr>
          <th>식대분할</th>
          <td className='center' colSpan={3}>{wedding.meal_method}</td>
        </tr>

        <tr>
          <th>식대단가</th>
          <td className='center' colSpan={3}>{unitOfAccount(wedding.meal_price, '원')}</td>
        </tr>

        <tr>
          <th>하객인원</th>
          <td className='center'>{unitOfAccount(wedding.husband_meal, '명')}</td>
          <td className='center'>{unitOfAccount(wedding.bride_meal, '명')}</td>
          <td className='center'>
            {unitOfAccount(wedding.husband_meal + wedding.bride_meal, '명')}
          </td>
        </tr>

        <tr>
          <th className='white result'>총 식사비용</th>
          <td className='result'>
            {unitOfAccount(wedding.meal_price * wedding.husband_meal, '원')}
          </td>
          <td className='result'>
            {unitOfAccount(wedding.meal_price * wedding.bride_meal, '원')}
          </td>
          <td className='sub-result'>
            {unitOfAccount(wedding.meal_price * (wedding.husband_meal + wedding.bride_meal), '원')}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ReadWeddingSecond;