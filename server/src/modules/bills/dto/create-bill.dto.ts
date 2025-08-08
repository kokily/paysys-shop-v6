import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBillDto {
  @ApiProperty({ description: '전표 제목', example: 'XX 돌잔치' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '행사 장소', example: '화랑홀' })
  @IsString()
  @IsNotEmpty()
  hall: string;

  @ApiProperty({ description: '기타 사항', example: '특이사항 없음' })
  @IsString()
  @IsNotEmpty()
  etc: string;
}