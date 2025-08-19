import type { AuthenticatedRequest } from 'src/types/jwt.types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { ListUsersDto } from './dto/list-users.dto';
import { UsersService } from './users.service';
import { SetAdminDto } from './dto/set-admin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '사용자 리스트 조회(관리자)' })
  @ApiResponse({ status: 200, description: '사용자 리스트 조회 성공' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async findAll(@Query() listUsersDto: ListUsersDto, @Request() _req: AuthenticatedRequest) {
    return this.usersService.findAll(listUsersDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '사용자 상세 조회(관리자)' })
  @ApiResponse({ status: 200, description: '사용자 상세 조회 성공' })
  @ApiResponse({ status: 404, description: '사용자 찾을 수 없음' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async findOne(@Param('id') id: string, @Request() _req: AuthenticatedRequest) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '사용자 삭제' })
  @ApiResponse({ status: 201, description: '사용자 삭제 성공' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async remove(@Param('id') id: string, @Request() _req: AuthenticatedRequest) {
    return this.usersService.remove(id);
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '관리자 권한 부여' })
  @ApiResponse({ status: 201, description: '사용자 권한 변경' })
  @ApiResponse({ status: 404, description: '사용자 찾을 수 없음' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async setAdmin(@Body() setAdminDto: SetAdminDto, @Request() _req: AuthenticatedRequest) {
    return this.usersService.setAdmin(setAdminDto);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiResponse({ status: 200, description: '비밀번호 변경 성공' })
  @ApiResponse({ status: 404, description: '사용자 찾을 수 없음' })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req: AuthenticatedRequest) {
    return this.usersService.changePassword(req.user.user_id, changePasswordDto.password);
  }
}
