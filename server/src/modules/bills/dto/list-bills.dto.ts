import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListBillsDto {
  @ApiProperty({ description: '제목 검색' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: '장소 검색' })
  @IsString()
  @IsOptional()
  hall?: string;

  @ApiProperty({ description: '사용자 검색' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Cursor ID (스크롤링용)' })
  @IsString()
  @IsOptional()
  cursor?: string;
}
