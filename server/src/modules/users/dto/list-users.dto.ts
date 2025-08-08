import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ListUsersDto {
  @ApiProperty({ description: '사용자 이름 검색', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: '페이지네이션 Cursor ID', required: false })
  @IsString()
  @IsOptional()
  cursor?: string;
}