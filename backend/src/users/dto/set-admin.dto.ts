import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SetAdminDto {
  @ApiProperty({ description: '유저 ID' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: '관리자 여부' })
  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
} 