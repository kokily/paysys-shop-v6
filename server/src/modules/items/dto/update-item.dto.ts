import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateItemDto {
  @ApiProperty({ description: '품명', example: '중정식', required: false })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ description: '구분', example: '식사(중식)', required: false })
  @IsString()
  @IsNotEmpty()
  divide?: string;

  @ApiProperty({ description: '대상', example: '회원', required: false })
  @IsString()
  @IsNotEmpty()
  native?: string;

  @ApiProperty({ description: '단위', example: '명', required: false })
  @IsString()
  @IsNotEmpty()
  unit?: string;

  @ApiProperty({ description: '단가', example: 68000, required: false })
  @IsNotEmpty()
  price?: number;
}