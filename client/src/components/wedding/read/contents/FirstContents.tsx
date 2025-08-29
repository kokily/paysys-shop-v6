import type { WeddingType } from '../../../../types/wedding.types';
import { convertWeddingToResult, unitOfAccount } from '../../../../libs/data/utils';
import './CommonContents.scss';

interface Props {
  wedding: WeddingType;
}

function FirstContents({ wedding }: Props) {
  const result = convertWeddingToResult(wedding);

  return (
    <table className="first-contents-container">
      <thead>
        <tr>
          <th colSpan={4}>예식비용</th>
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
          <th>웨딩홀 사용료</th>
          <td>{unitOfAccount(wedding.husband_hall, '원')}</td>
          <td>{unitOfAccount(wedding.bride_hall, '원')}</td>
          <td>{unitOfAccount(wedding.husband_hall + wedding.bride_hall, '원')}</td>
        </tr>

        <tr>
          <th>예도물품</th>
          <td>{unitOfAccount(wedding.husband_sword, '원')}</td>
          <td>{unitOfAccount(wedding.bride_sword, '원')}</td>
          <td>{unitOfAccount(wedding.husband_sword + wedding.bride_sword, '원')}</td>
        </tr>

        <tr>
          <th>부 케</th>
          <td>{unitOfAccount(wedding.husband_bouquet, '원')}</td>
          <td>{unitOfAccount(wedding.bride_bouquet, '원')}</td>
          <td>{unitOfAccount(wedding.husband_bouquet + wedding.bride_bouquet, '원')}</td>
        </tr>

        <tr>
          <th colSpan={4}>웨딩업체</th>
        </tr>

        <tr>
          <th>웨딩업체</th>
          <td>{unitOfAccount(wedding.husband_company, '원')}</td>
          <td>{unitOfAccount(wedding.bride_company, '원')}</td>
          <td>{unitOfAccount(wedding.husband_company + wedding.bride_company, '원')}</td>
        </tr>

        <tr>
          <th>혼주미용(여)</th>
          <td>{unitOfAccount(wedding.husband_owner_woman, '원')}</td>
          <td>{unitOfAccount(wedding.bride_owner_woman, '원')}</td>
          <td>{unitOfAccount(wedding.husband_owner_woman + wedding.bride_owner_woman, '원')}</td>
        </tr>

        <tr>
          <th>혼주미용(남)</th>
          <td>{unitOfAccount(wedding.husband_owner_man, '원')}</td>
          <td>{unitOfAccount(wedding.bride_owner_man, '원')}</td>
          <td>{unitOfAccount(wedding.husband_owner_man + wedding.bride_owner_man, '원')}</td>
        </tr>

        <tr>
          <th>액 자</th>
          <td>{unitOfAccount(wedding.husband_frame, '원')}</td>
          <td>{unitOfAccount(wedding.bride_frame, '원')}</td>
          <td>{unitOfAccount(wedding.husband_frame + wedding.bride_frame, '원')}</td>
        </tr>

        <tr>
          <th>원본파일</th>
          <td>{unitOfAccount(wedding.husband_file, '원')}</td>
          <td>{unitOfAccount(wedding.bride_file, '원')}</td>
          <td>{unitOfAccount(wedding.husband_file + wedding.bride_file, '원')}</td>
        </tr>

        <tr>
          <th>DVD</th>
          <td>{unitOfAccount(wedding.husband_dvd, '원')}</td>
          <td>{unitOfAccount(wedding.bride_dvd, '원')}</td>
          <td>{unitOfAccount(wedding.husband_dvd + wedding.bride_dvd, '원')}</td>
        </tr>

        <tr>
          <th>기타비용</th>
          <td>{unitOfAccount(wedding.husband_etc, '원')}</td>
          <td>{unitOfAccount(wedding.bride_etc, '원')}</td>
          <td>{unitOfAccount(wedding.husband_etc + wedding.bride_etc, '원')}</td>
        </tr>

        <tr>
          <th colSpan={4}>계</th>
        </tr>

        <tr>
          <th className="white result">총 예식비용</th>
          <td className="result">{unitOfAccount(result.husband_cost, '원')}</td>
          <td className="result">{unitOfAccount(result.bride_cost, '원')}</td>
          <td className="sub-result">{unitOfAccount(result.husband_cost + result.bride_cost, '원')}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default FirstContents;
