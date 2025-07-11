import { Controller, Post, Body, Request, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: AuthDto })
  async register(@Body() body: AuthDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(body);
      return res.status(HttpStatus.CREATED).json({
        user_id: user.id,
        username: user.username,
        admin: false,
      });
    } catch (err: any) {
      if (err.code === '23505') {
        // unique violation
        return res.status(HttpStatus.CONFLICT).send('이미 이용중인 아이디입니다');
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  @Post('login')
  @ApiBody({ type: AuthDto })
  async login(@Body() body: AuthDto, @Res() res: Response) {
    if (!body || !body.username || !body.password) {
      return res.status(HttpStatus.BAD_REQUEST).send('요청값이 올바르지 않습니다');
    }
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      // 사용자 없음 또는 비밀번호 틀림
      // 실제로는 validateUser에서 구분 가능하게 리턴해도 됨
      // 여기서는 404(사용자 없음), 401(비번 틀림) 구분 없이 401로 통일
      return res.status(HttpStatus.UNAUTHORIZED).send('등록된 사용자가 없거나 비밀번호가 틀렸습니다');
    }
    // 로그인 성공 시 기존과 동일한 응답
    return res.status(HttpStatus.OK).json({
      user_id: user.id,
      username: user.username,
      admin: user.admin,
      access_token: (await this.authService.login(user)).access_token,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }  
} 