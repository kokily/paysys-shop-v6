import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class AuthDto {
  @ApiProperty({
    description: '사용자명',
    example: '사용자',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: '비밀번호 (최소 4자)',
    example: 'test1234',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  password: string;
}