import type { AuthenticatedRequest } from "src/types/auth.types";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { WeddingsService } from "./weddings.service";
import { ListWeddingsDto } from "./dto/list-weddings.dto";
import { UpdateWeddingDto } from "./dto/update-wedding.dto";

@ApiTags('Weddings')
@Controller('weddings')
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  /**
   * 웨딩 정보 생성
   * - 새로운 웨딩 정보 등록
   * - 관리자만 생성 가능
   * @param createWeddingDto 웨딩 생성 데이터
   * @param req 인증된 사용자 정보
   * @returns 생성된 웨딩 정보
   */
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 정보 생성' })
  @ApiResponse({ status: 201, description: '웨딩 정보 생성 성공' })
  async create(
    @Body() createWeddingDto: CreateWeddingDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.weddingsService.create(createWeddingDto);
  }

  /**
   * 웨딩 리스트 조회
   * - 전체 웨딩 리스트 조회
   * - 필터링 지원: 신랑/부 이름, 날짜 범위
   * - 페이지네이션 (Cursor 기반)
   * - 관리자만 조회 가능
   * @param listWeddingsDto 조회 조건
   * @param req 인증된 사용자 정보
   * @returns 웨딩 목록
   */
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 리스트 조회' })
  @ApiResponse({ status: 200, description: '웨딩 리스트 조회 성공' })
  async findAll(
    @Query() listWeddingsDto: ListWeddingsDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.weddingsService.findAll(listWeddingsDto);
  }

  /**
   * 웨딩 상세 조회
   * - 특정 웨딩의 상세 정보 조회
   * - 관리자만 조회 가능
   * @param id 웨딩 ID
   * @param req 인증된 사용자 정보
   * @returns 웨딩 상세 정보
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 상세 조회' })
  @ApiResponse({ status: 200, description: '웨딩 조회 성공' })
  @ApiResponse({ status: 404, description: '웨딩을 찾을 수 없음' })
  async findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.weddingsService.findOne(id);
  }

  /**
   * 웨딩 정보 수정
   * - 기존 웨딩 정보 업데이트
   * - 관리자만 수정 가능
   * @param id 웨딩 ID
   * @param updateWeddingDto 수정할 데이터
   * @param req 인증된 사용자 정보
   * @returns 수정된 웨딩 정보
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 정보 수정' })
  @ApiResponse({ status: 200, description: '웨딩 수정 성공' })
  @ApiResponse({ status: 404, description: '웨딩을 찾을 수 없음' })
  async update(
    @Param('id') id: string,
    @Body() updateWeddingDto: UpdateWeddingDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.weddingsService.update(id, updateWeddingDto);
  }

  /**
   * 웨딩 정보 삭제
   * - 웨딩 정보 완전 삭제
   * - 관리자만 삭제 가능
   * @param id 웨딩 ID
   * @param req 인증된 사용자 정보
   * @returns 삭제 성공 메시지
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '웨딩 정보 삭제' })
  @ApiResponse({ status: 200, description: '웨딩 삭제 성공' })
  @ApiResponse({ status: 404, description: '웨딩을 찾을 수 없음' })
  async remove(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.weddingsService.remove(id);
  }
}