import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class SetAdminDto {
  @ApiProperty({ description: '사용자 ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;

  @ApiProperty({ default: '관리자 권한 여부', example: true })
  @IsBoolean()
  isAdmin: boolean;
}