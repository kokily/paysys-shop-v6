import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

/**
 * 품목 생성 DTO
 * 
 * @description
 * 새로운 품목을 생성할 때 사용하는 데이터 전송 객체입니다.
 * 모든 필드는 필수이며, 각 필드에 대한 유효성 검사가 적용됩니다.
 * 
 * @example
 * {
 *   "num": 1001,
 *   "name": "김치찌개",
 *   "divide": "식사(중식)",
 *   "native": "회원",
 *   "unit": "인분",
 *   "price": 8000
 * }
 */
export class CreateItemDto {
  /**
   * 품목 번호
   * 
   * @description
   * 품목을 구분하기 위한 고유 번호입니다.
   * 1 이상의 정수여야 하며, 중복되지 않아야 합니다.
   * 
   * @example 1001
   */
  @ApiProperty({ 
    description: '품목 번호',
    example: 1001,
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  num: number;

  /**
   * 품목명
   * 
   * @description
   * 품목의 이름입니다. 빈 문자열이 아니어야 합니다.
   * 
   * @example "김치찌개"
   */
  @ApiProperty({ 
    description: '품목명',
    example: '김치찌개'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * 식사 종류
   * 
   * @description
   * 품목의 식사 종류입니다.
   * 예: '식사(중식)', '식사(양식)', '식사(일식)', '음료', '디저트' 등
   * 
   * @example "식사(중식)"
   */
  @ApiProperty({ 
    description: '식사 종류',
    example: '식사(중식)'
  })
  @IsString()
  @IsNotEmpty()
  divide: string;

  /**
   * 회원 등급
   * 
   * @description
   * 품목의 회원 등급입니다.
   * 예: '회원', '준회원', '일반'
   * 
   * @example "회원"
   */
  @ApiProperty({ 
    description: '회원 등급',
    example: '회원'
  })
  @IsString()
  @IsNotEmpty()
  native: string;

  /**
   * 단위
   * 
   * @description
   * 품목의 판매 단위입니다.
   * 예: '인분', '개', '잔', '그릇' 등
   * 
   * @example "인분"
   */
  @ApiProperty({ 
    description: '단위',
    example: '인분'
  })
  @IsString()
  @IsNotEmpty()
  unit: string;

  /**
   * 가격
   * 
   * @description
   * 품목의 판매 가격입니다. 0 이상의 정수여야 합니다.
   * 
   * @example 8000
   */
  @ApiProperty({ 
    description: '가격',
    example: 8000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  price: number;
} 