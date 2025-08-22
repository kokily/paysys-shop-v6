import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class ListWeddingsDto {
  @ApiProperty({ description: '페이지 크기', required: false, default: 30 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 30;

  @ApiProperty({ description: 'cursor (마지막 ID)', required: false })
  @IsOptional()
  @IsString()
  cursor?: string;
}
