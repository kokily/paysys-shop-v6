import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class RemoveSignDto {
  @ApiProperty({ description: '웨딩 ID' })
  @IsString()
  @IsNotEmpty()
  weddingId: string;

  @ApiProperty({ description: '성별', enum: ['husband', 'bride'] })
  @IsString()
  @IsIn(['husband', 'bride'])
  sex: string;
}
