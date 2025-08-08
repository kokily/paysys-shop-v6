import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBillDto {
  @ApiProperty({ 
    description: '전표 제목', 
    example: '김철수 결혼식',
    required: false 
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ 
    description: '행사장소', 
    example: '그랜드호텔 3층 그랜드볼룸',
    required: false 
  })
  @IsString()
  @IsOptional()
  hall?: string;

  @ApiProperty({ 
    description: '기타 사항', 
    example: '특별 요청사항 없음',
    required: false 
  })
  @IsString()
  @IsOptional()
  etc?: string;
}