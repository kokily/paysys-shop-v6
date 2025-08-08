import type { AuthenticatedRequest } from "src/types/auth.types";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateBillDto } from "./dto/create-bill.dto";
import { ListBillsDto } from "./dto/list-bills.dto";
import { BillsService } from "./bills.service";

@ApiTags('Bills')
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  /**
   * 
   * @param createBillDto 
   * @param req 
   * @returns 
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 생성' })
  @ApiResponse({ status: 201, description: '전표 생성 성공' })
  @ApiResponse({ status: 404, description: '카트가 비어있습니다.' })
  async create(
    @Body() createBillDto: CreateBillDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.billsService.create(req.user.user_id, req.user.username, createBillDto);
  }

  /**
   * 전표 리스트 조회
   * - 전체 전표 목록 조회
   * - 필터링 지원: user_id, title, hall
   * - 페이지네이션 (Cursor 기반)
   * - 삭제된 전표는 제외
   * @param listBillsDto 조회 조건
   * @param req 인증된 사용자 정보
   * @returns 전표 목록
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 리스트 조회' })
  @ApiResponse({ status: 200, description: '전표 리스트 조회 성공' })
  async findAll(
    @Query() listBillsDto: ListBillsDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.billsService.findAll(listBillsDto);
  }

  /**
   * 전표 상세 조회
   * - 특정 전표의 상세 정보 조회
   * - 전표 품목 목록 포함
   * @param id 전표 ID
   * @param req 인증된 사용자 정보
   * @returns 전표 상세 정보
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 상세 조회' })
  @ApiResponse({ status: 200, description: '전표 조회 성공' })
  @ApiResponse({ status: 404, description: '전표를 찾을 수 없음' })
  async findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.billsService.findOne(id, req.user.user_id);
  }

  /**
   * 전표 삭제
   * - 물리적 삭제 (완전 제거)
   * - 본인이 작성한 전표이거나 관리자만 삭제 가능
   * @param id 전표 ID
   * @param req 인증된 사용자 정보
   * @returns 삭제 성공 메시지
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 삭제' })
  @ApiResponse({ status: 200, description: '전표 삭제 성공' })
  @ApiResponse({ status: 404, description: '전표를 찾을 수 없음' })
  @ApiResponse({ status: 403, description: '삭제 권한 없음' })
  async remove(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.billsService.remove(id, req.user.user_id, req.user.admin);
  }

  /**
   * 전표 복원
   * - 삭제된 전표 복원
   * - 삭제 플래그 제거
   * @param id 전표 ID
   * @param req 인증된 사용자 정보
   * @returns 복원된 전표 정보
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '전표 복원' })
  @ApiResponse({ status: 200, description: '전표 복원 성공' })
  @ApiResponse({ status: 404, description: '전표를 찾을 수 없음' })
  async restore(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.billsService.restore(id, req.user.user_id);
  }
}