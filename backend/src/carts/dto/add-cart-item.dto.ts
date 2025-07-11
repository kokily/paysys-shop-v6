import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

/**
 * 장바구니 품목 추가 DTO
 * 
 * @description
 * 장바구니에 새로운 품목을 추가할 때 사용하는 데이터 전송 객체입니다.
 * 모든 필드는 필수이며, 각 필드에 대한 유효성 검사가 적용됩니다.
 * 
 * @example
 * {
 *   "item_id": "item-uuid",
 *   "count": 2,
 *   "price": 8000
 * }
 */
export class AddCartItemDto {
  /**
   * 품목 ID
   * 
   * @description
   * 장바구니에 추가할 품목의 고유 ID입니다.
   * 존재하는 품목의 ID여야 합니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiProperty({ 
    description: '품목 ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  item_id: string;

  /**
   * 수량
   * 
   * @description
   * 장바구니에 추가할 품목의 수량입니다.
   * 1 이상의 정수여야 합니다.
   * 
   * @example 2
   */
  @ApiProperty({ 
    description: '수량',
    example: 2,
    minimum: 1
  })
  @IsNumber()
  @Min(1)
  count: number;

  /**
   * 가격
   * 
   * @description
   * 장바구니에 추가할 품목의 가격입니다.
   * 0 이상의 정수여야 합니다.
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