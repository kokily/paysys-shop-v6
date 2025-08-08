import type { AuthenticatedRequest } from "src/types/auth.types";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { ListUsersDto } from "./dto/list-users.dto";
import { SetAdminDto } from "./dto/set-admin.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UsersService } from "./users.service";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 사용자 리스트 조회
   * - 관리자 권한 필요
   * - 전체 사용자 목록 조회
   * - 필터링 지원: username
   * - 페이지네이션 (Cursor 기반, 20개씩)
   * - 생성일 역순 정렬
   * @param listUsersDto 조회 조건
   * @param req 인증된 사용자 정보
   * @returns 사용자 리스트
   */
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '사용자 리스트 조회(관리자)' })
  @ApiResponse({ status: 200, description: '사용자 리스트 조회 성공' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async findAll(
    @Query() listUsersDto: ListUsersDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.usersService.findAll(listUsersDto);
  }

  /**
   * 특정 사용자 상세 조회
   * - 관리자 권한 필요
   * - 특정 사용자의 상세 정보 조회
   * - 비밀번호는 제외하고 반환
   * @param id 사용자 ID
   * @param req 인증된 사용자 정보
   * @returns 사용자 상세 정보
   */
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '특정 사용자 상세 조회(관리자)' })
  @ApiResponse({ status: 200, description: '특정 사용자 조회 성공' })
  @ApiResponse({ status: 404, description: '특정 사용자를 찾지 못했습니다.' })
  async findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.usersService.findOne(id);
  }

  /**
   * 사용자 삭제
   * - 관리자 권한 필요
   * - 물리적 삭제 (완전 제거)
   * - 관련 데이터도 함께 삭제됨
   * @param id 사용자 ID
   * @param req 인증된 사용자 정보
   * @returns 삭제 성공 메시지
   */
  @Delete('id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '사용자 삭제(관리자' })
  @ApiResponse({ status: 200, description: '사용자 삭제 성공' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async remove(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.usersService.remove(id);
  }

  /**
   * 관리자 권한 설정
   * - 관리자 권한 필요
   * - 특정 사용자의 관리자 권한 설정/해제
   * @param setAdminDto 관리자 권한 설정 정보
   * @param req 인증된 사용자 정보
   * @returns 설정 성공 메시지
   */
  @Post('admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '관리자 권한 설정(관리자)' })
  @ApiResponse({ status: 200, description: '관리자 권한 설정 성공' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async setAdmin(
    @Body() setAdminDto: SetAdminDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.usersService.setAdmin(setAdminDto.id, setAdminDto.isAdmin);
  }

  /**
   * 비밀번호 변경
   * - 일반 사용자 권한
   * - 현재 로그인한 사용자의 비밀번호만 변경 가능
   * - 새 비밀번호 해시화 저장
   * @param changePasswordDto 비밀번호 변경 정보
   * @param req 인증된 사용자 정보
   * @returns 변경 성공 메시지
   */
  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiResponse({ status: 200, description: '비밀번호 변경 성공' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.usersService.changePassword(req.user.user_id, changePasswordDto.password);
  }
}