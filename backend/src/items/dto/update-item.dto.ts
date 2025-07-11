import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

/**
 * 품목 수정 DTO
 * 
 * @description
 * 기존 품목을 수정할 때 사용하는 데이터 전송 객체입니다.
 * 모든 필드는 선택사항이며, 전송된 필드만 수정됩니다 (부분 업데이트).
 * 
 * @example
 * // 전체 필드 수정
 * {
 *   "num": 1002,
 *   "name": "김치찌개(대)",
 *   "divide": "식사(중식)",
 *   "native": "회원",
 *   "unit": "인분",
 *   "price": 10000
 * }
 * 
 * // 부분 수정 (품목명과 가격만 변경)
 * {
 *   "name": "김치찌개(대)",
 *   "price": 10000
 * }
 */
export class UpdateItemDto {
  /**
   * 품목 번호
   * 
   * @description
   * 품목을 구분하기 위한 고유 번호입니다.
   * 1 이상의 정수여야 하며, 중복되지 않아야 합니다.
   * 
   * @example 1002
   */
  @ApiPropertyOptional({ 
    description: '품목 번호',
    example: 1002,
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  num?: number;

  /**
   * 품목명
   * 
   * @description
   * 품목의 이름입니다. 빈 문자열이 아니어야 합니다.
   * 
   * @example "김치찌개(대)"
   */
  @ApiPropertyOptional({ 
    description: '품목명',
    example: '김치찌개(대)'
  })
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * 식사 종류
   * 
   * @description
   * 품목의 식사 종류입니다.
   * 예: '식사(중식)', '식사(양식)', '식사(일식)', '음료', '디저트' 등
   * 
   * @example "식사(중식)"
   */
  @ApiPropertyOptional({ 
    description: '식사 종류',
    example: '식사(중식)'
  })
  @IsOptional()
  @IsString()
  divide?: string;

  /**
   * 회원 등급
   * 
   * @description
   * 품목의 회원 등급입니다.
   * 예: '회원', '준회원', '일반'
   * 
   * @example "회원"
   */
  @ApiPropertyOptional({ 
    description: '회원 등급',
    example: '회원'
  })
  @IsOptional()
  @IsString()
  native?: string;

  /**
   * 단위
   * 
   * @description
   * 품목의 판매 단위입니다.
   * 예: '인분', '개', '잔', '그릇' 등
   * 
   * @example "인분"
   */
  @ApiPropertyOptional({ 
    description: '단위',
    example: '인분'
  })
  @IsOptional()
  @IsString()
  unit?: string;

  /**
   * 가격
   * 
   * @description
   * 품목의 판매 가격입니다. 0 이상의 정수여야 합니다.
   * 
   * @example 10000
   */
  @ApiPropertyOptional({ 
    description: '가격',
    example: 10000,
    minimum: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
} 