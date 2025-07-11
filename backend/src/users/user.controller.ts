import { Controller, Get, Post, Delete, Body, Param, Query, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SetAdminDto } from './dto/set-admin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /api/users?username=&cursor=
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'username', required: false, type: String, description: 'username' })
  @ApiQuery({ name: 'cursor', required: false, type: String, description: 'cursor' })
  @Get()
  async list(@Res() res: Response, @Query('username') username?: string, @Query('cursor') cursor?: string) {
    try {
      const users = await this.userService.list({ username, cursor });
      return res.status(HttpStatus.OK).json(users);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  // GET /api/users/:id
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Get(':id')
  async read(@Param('id') id: string, @Res() res: Response) {
    
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send('존재하지 않는 사용자입니다.');
      }
      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  // DELETE /api/users/:id
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  // POST /api/users/set-admin
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiBody({ type: SetAdminDto })
  @Post('set-admin')
  async setAdmin(@Body() body: SetAdminDto, @Res() res: Response) {
    const { id, isAdmin } = body;
    if (!id || typeof isAdmin !== 'boolean') {
      return res.status(HttpStatus.BAD_REQUEST).send('요청값이 올바르지 않습니다');
    }
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send('해당 사용자가 존재하지 않습니다.');
      }
      await this.userService.setAdmin(id, isAdmin);
      return res.status(HttpStatus.OK).send();
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  // POST /api/users/change-password
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDto })
  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordDto, @Req() req: Request, @Res() res: Response) {
    const { password } = body;
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
    }
    if (!password || password.length < 4) {
      return res.status(HttpStatus.BAD_REQUEST).send('비밀번호는 4자 이상이어야 합니다');
    }
    try {
      const user = await this.userService.findOne(userId);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send('접속된 사용자가 없습니다.');
      }
      await this.userService.changePassword(userId, password);
      return res.status(HttpStatus.OK).send();
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 