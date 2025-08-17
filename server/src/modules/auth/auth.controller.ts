import type { AuthenticatedRequest } from 'src/types/jwt.types';
import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '회원가입(관리자)' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 존재하는 사용자' })
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '로그아웃' })
  async logout(@Request() req: AuthenticatedRequest) {
    if (!req.user || !req.user.user_id) {
      throw new UnauthorizedException('인증 정보가 없습니다.');
    }

    return this.authService.logout(req.user.user_id);
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '인증 상태 확인' })
  async check(@Request() req: AuthenticatedRequest) {
    return this.authService.check(req.user.user_id);
  }
}
