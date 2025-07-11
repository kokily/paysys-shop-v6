import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({ example: 'username', description: "사용자 이름" })
  username: string;

  @ApiProperty({ example: 'password', description: "비밀번호" })
  password: string;
}