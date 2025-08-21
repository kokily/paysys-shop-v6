import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class AddSignDto {
  @ApiProperty({ description: '웨딩 ID' })
  @IsString()
  @IsNotEmpty()
  weddingId: string;

  @ApiProperty({ description: '성별', enum: ['husband', 'bride'] })
  @IsString()
  @IsIn(['husband', 'bride'])
  sex: string;

  @ApiProperty({ default: '이미지 데이터' })
  @IsString()
  image: string;
}
