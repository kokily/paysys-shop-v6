import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddBillDto {
  @ApiProperty({ description: '행사 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '행사 장소' })
  @IsString()
  @IsNotEmpty()
  hall: string;

  @ApiProperty({ description: '기타사항' })
  @IsString()
  @IsNotEmpty()
  etc: string;
}
