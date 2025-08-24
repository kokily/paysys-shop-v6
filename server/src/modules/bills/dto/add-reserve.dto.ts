import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddReserveDto {
  @ApiProperty({ description: '전표 ID' })
  @IsString()
  bill_id: string;

  @ApiProperty({ description: '예약금' })
  @IsNumber()
  reserve: number;
}
