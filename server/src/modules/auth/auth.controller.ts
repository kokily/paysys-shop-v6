import type { AuthenticatedRequest } from 'src/types/jwt.types';
import type { Response } from 'express';
import { Body, Controller, Get, Post, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
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
  async login(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(authDto);

    // Refresh Token을 쿠키로 설정
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    });

    const { refresh_token, ...response } = result;
    return response;
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

  @Post('refresh')
  @ApiOperation({ summary: 'Access Token 갱신' })
  @ApiResponse({ status: 200, description: '토큰 갱신 성공' })
  @ApiResponse({ status: 401, description: 'Refresh Token이 유효하지 않음' })
  async refresh(@Request() req: Request & { cookies?: { refresh_token?: string } }) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token이 없습니다.');
    }

    return this.authService.refresh(refreshToken);
  }
}
