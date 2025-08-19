import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddItemDto {
  @ApiProperty({ description: '품명', example: '중정식' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '구분', example: '식사(중식)' })
  @IsString()
  @IsNotEmpty()
  divide: string;

  @ApiProperty({ description: '대상', example: '회원' })
  @IsString()
  @IsNotEmpty()
  native: string;

  @ApiProperty({ description: '단위', example: '명' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ description: '단가', example: 68000 })
  @IsNotEmpty()
  price: number;
}
