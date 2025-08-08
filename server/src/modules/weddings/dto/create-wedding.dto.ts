import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateWeddingDto {
  // 신랑 비용
  @ApiProperty({ description: '신랑 이름' })
  @IsString()
  husband_name: string;

  @ApiProperty({ description: '신랑 서명', required: false })
  @IsString()
  husband_image: string;

  @ApiProperty({ description: '신랑 예식비용' })
  @IsNumber()
  husband_cost: number;

  @ApiProperty({ description: '신랑 식사비용' })
  @IsNumber()
  husband_meal: number;
  
  @ApiProperty({ description: '신랑 답례품' })
  @IsNumber()
  husband_present: number;
  
  @ApiProperty({ description: '신랑 예약금' })
  @IsNumber()
  husband_reserve: number;
  
  @ApiProperty({ description: '신랑 웨딩홀 사용료' })
  @IsNumber()
  husband_hall: number;
  
  @ApiProperty({ description: '신랑 예도세트' })
  @IsNumber()
  husband_sword_set: number;
  
  @ApiProperty({ description: '신랑 예도' })
  @IsNumber()
  husband_sword: number;
  
  @ApiProperty({ description: '신랑 장갑' })
  @IsNumber()
  husband_glove: number;
  
  @ApiProperty({ description: '신랑 부케' })
  @IsNumber()
  husband_bouquet: number;
  
  @ApiProperty({ description: '신랑 웨딩업체' })
  @IsNumber()
  husband_company: number;
  
  @ApiProperty({ description: '신랑 혼주미용(여)' })
  @IsNumber()
  husband_owner_woman: number;
  
  @ApiProperty({ description: '신랑 혼주미용(남)' })
  @IsNumber()
  husband_owner_man: number;
  
  @ApiProperty({ description: '신랑 액자' })
  @IsNumber()
  husband_frame: number;
  
  @ApiProperty({ description: '신랑 원본파일' })
  @IsNumber()
  husband_file: number;
  
  @ApiProperty({ description: '신랑 DVD' })
  @IsNumber()
  husband_dvd: number;
  
  @ApiProperty({ description: '신랑 기타' })
  @IsNumber()
  husband_etc: number;

  // 신부 비용
  @ApiProperty({ description: '신부 이름' })
  @IsString()
  bride_name: string;

  @ApiProperty({ description: '신부 서명', required: false })
  @IsString()
  bride_image: string;

  @ApiProperty({ description: '신부 예식비용' })
  @IsNumber()
  bride_cost: number;

  @ApiProperty({ description: '신부 식사비용' })
  @IsNumber()
  bride_meal: number;
  
  @ApiProperty({ description: '신부 답례품' })
  @IsNumber()
  bride_present: number;
  
  @ApiProperty({ description: '신부 예약금' })
  @IsNumber()
  bride_reserve: number;
  
  @ApiProperty({ description: '신부 웨딩홀 사용료' })
  @IsNumber()
  bride_hall: number;
  
  @ApiProperty({ description: '신부 예도세트' })
  @IsNumber()
  bride_sword_set: number;
  
  @ApiProperty({ description: '신부 예도' })
  @IsNumber()
  bride_sword: number;
  
  @ApiProperty({ description: '신부 장갑' })
  @IsNumber()
  bride_glove: number;
  
  @ApiProperty({ description: '신부 부케' })
  @IsNumber()
  bride_bouquet: number;
  
  @ApiProperty({ description: '신부 웨딩업체' })
  @IsNumber()
  bride_company: number;
  
  @ApiProperty({ description: '신부 혼주미용(여)' })
  @IsNumber()
  bride_owner_woman: number;
  
  @ApiProperty({ description: '신부 혼주미용(남)' })
  @IsNumber()
  bride_owner_man: number;
  
  @ApiProperty({ description: '신부 액자' })
  @IsNumber()
  bride_frame: number;
  
  @ApiProperty({ description: '신부 원본파일' })
  @IsNumber()
  bride_file: number;
  
  @ApiProperty({ description: '신부 DVD' })
  @IsNumber()
  bride_dvd: number;
  
  @ApiProperty({ description: '신부 기타' })
  @IsNumber()
  bride_etc: number;

  // 웨딩 날짜, 시간
  @ApiProperty({ description: '웨딩 날짜 (YYYY-MM-DD)' })
  @IsDateString()
  wedding_at: string;

  @ApiProperty({ description: '행사 시간 (예: 11:30, 13:00, 14:30, 16:00, 17:30)' })
  @IsString()
  event_at: string;
}