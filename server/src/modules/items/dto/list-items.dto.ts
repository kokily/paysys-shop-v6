import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListItemsDto {
  @ApiProperty({ description: '구분 필터', required: false })
  @IsString()
  @IsOptional()
  divide?: string;

  @ApiProperty({ description: '대상 필터', required: false })
  @IsString()
  @IsOptional()
  native?: string;

  @ApiProperty({ description: '품명 검색', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '페이지 네이션 Cursor ID', required: false })
  @IsString()
  @IsOptional()
  cursor?: string;
}
