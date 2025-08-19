import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListUsersDto {
  @ApiProperty({ description: '페이지 네이션 Cursor ID', required: false })
  @IsString()
  @IsOptional()
  cursor?: string;
}
