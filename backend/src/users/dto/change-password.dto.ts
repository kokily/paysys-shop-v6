import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ description: '새 비밀번호', minLength: 4 })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
} 