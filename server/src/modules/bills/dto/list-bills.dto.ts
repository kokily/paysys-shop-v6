import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListBillsDto {
  @ApiProperty({ description: '사용자 ID 필터', required: false })
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiProperty({ description: '전표 제목 검색', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: '행사장소 검색', required: false })
  @IsString()
  @IsOptional()
  hall?: string;

  @ApiProperty({ description: '커서 페이지네이션 ID', required: false })
  @IsString()
  @IsOptional()
  cursor?: string;
}