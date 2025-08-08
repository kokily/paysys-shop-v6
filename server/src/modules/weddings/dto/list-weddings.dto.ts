import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class ListWeddingsDto {
  @ApiProperty({ description: '신랑 이름 검색', required: false })
  @IsOptional()
  @IsString()
  husband_name?: string;

  @ApiProperty({ description: '신부 이름 검색', required: false })
  @IsOptional()
  @IsString()
  bride_name?: string;

  @ApiProperty({ description: '검색 시작 날짜 (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiProperty({ description: '검색 종료 날짜 (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({ description: '페이지 크기', required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ description: 'cursor (마지막 ID)', required: false })
  @IsOptional()
  @IsString()
  cursor?: string;
}