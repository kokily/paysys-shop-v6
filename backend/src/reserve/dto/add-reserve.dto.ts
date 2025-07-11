import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

/**
 * 예약금 추가 DTO
 * 
 * @description
 * 청구서에 예약금을 추가할 때 사용하는 데이터 전송 객체입니다.
 * 모든 필드는 필수이며, 각 필드에 대한 유효성 검사가 적용됩니다.
 * 
 * @example
 * {
 *   "bill_id": "bill-uuid",
 *   "reserve": 10000
 * }
 */
export class AddReserveDto {
  /**
   * 청구서 ID
   * 
   * @description
   * 예약금을 추가할 청구서의 고유 ID입니다.
   * 존재하는 청구서의 ID여야 합니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiProperty({ 
    description: '청구서 ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  bill_id: string;

  /**
   * 예약금
   * 
   * @description
   * 청구서에 추가할 예약금입니다.
   * 0 이상의 정수여야 합니다.
   * 
   * @example 10000
   */
  @ApiProperty({ 
    description: '예약금',
    example: 10000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  reserve: number;
} 