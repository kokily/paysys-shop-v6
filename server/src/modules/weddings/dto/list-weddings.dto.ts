import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class ListWeddingsDto {
  @ApiProperty({ description: '페이지 크기', required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({ description: 'cursor (마지막 ID)', required: false })
  @IsOptional()
  @IsString()
  cursor?: string;
}