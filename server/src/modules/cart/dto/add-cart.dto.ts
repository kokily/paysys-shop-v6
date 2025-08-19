import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class AddCartDto {
  @ApiProperty({ description: '품목 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  item_id: string;

  @ApiProperty({ description: '수량', example: 2, minimum: 1 })
  @IsNumber()
  @IsPositive()
  count: number;

  @ApiProperty({ description: '단가', example: 25000 })
  @IsNumber()
  price: number;
}
