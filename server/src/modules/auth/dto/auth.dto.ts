import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: '사용자명',
    example: '홍길동',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: '비밀번호 (최소 6자)',
    example: 'test12',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
