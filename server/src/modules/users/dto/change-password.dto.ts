import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({
    description: '새 비밀번호 (최소 6자리)',
    example: 'newpassword123',
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;
}