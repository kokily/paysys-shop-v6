import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * 청구서 생성 DTO
 * 
 * @description
 * 새로운 청구서를 생성할 때 사용하는 데이터 전송 객체입니다.
 * 모든 필드는 필수이며, 각 필드에 대한 유효성 검사가 적용됩니다.
 * 
 * @example
 * {
 *   "title": "2024년 1월 청구서",
 *   "hall": "대연홀",
 *   "etc": "추가 요청사항"
 * }
 */
export class CreateBillDto {
  /**
   * 청구서 제목
   * 
   * @description
   * 청구서의 제목입니다.
   * 
   * @example "2024년 1월 청구서"
   */
  @ApiProperty({ 
    description: '청구서 제목',
    example: '2024년 1월 청구서'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * 홀 정보
   * 
   * @description
   * 청구서와 관련된 홀 정보입니다.
   * 
   * @example "대연홀"
   */
  @ApiProperty({ 
    description: '홀 정보',
    example: '대연홀'
  })
  @IsString()
  @IsNotEmpty()
  hall: string;

  /**
   * 기타 정보
   * 
   * @description
   * 청구서와 관련된 기타 정보나 요청사항입니다.
   * 
   * @example "추가 요청사항"
   */
  @ApiProperty({ 
    description: '기타 정보',
    example: '추가 요청사항'
  })
  @IsString()
  @IsNotEmpty()
  etc: string;
} 