import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/admin.guard";
import { CreateItemDto } from "./dto/create-item.dto";
import { ListItemsDto } from "./dto/list-items.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemsService } from "./items.service";

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * 품목 추가
   * - 관리자 권한 필요
   * - 품목 번호 자동 생성: num
   * - 필수 필드: name, divide, native, unit, price
   * @param createItemDto 품목 생성 정보
   * @returns 생성된 품목 정보
   */
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 추가(관리자)' })
  @ApiResponse({ status: 201, description: '품목 추가 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiResponse({ status: 403, description: '관리자 권한 필요' })
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  /**
   * 품목 리스트 조회
   * - 일반 사용자 권한 필요
   * - 페이지네이션 지원 (cursor 기반)
   * - 필터링 지원: divide, native, name
   * - 30개씩 조회, num 역순 정렬
   * @param listItemsDto 조회 조건 (divide, native, name, cursor)
   * @returns 품목 목록
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 리스트 조회' })
  @ApiResponse({ status: 200, description: '품목 리스트 조회 성공' })
  async findAll(@Query() listItemsDto: ListItemsDto) {
    return this.itemsService.findAll(listItemsDto);
  }

  /**
   * 품목 상세 조회
   * - 일반 사용자 권한 필요
   * - ID로 특정 품목 조회
   * @param id 품목 ID (uuid)
   * @returns 품목 상세 정보
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 상세 조회' })
  @ApiResponse({ status: 200, description: '품목 조회 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾을 수 없음' })
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  /**
   * 품목 수정
   * - 관리자 권한 필요
   * - 부분 업데이트 지원 (원하는 필드만)
   * - 품목 번호(num)은 수정 불가
   * @param id 품목 ID (uuid)
   * @param updateItemDto 업데이트할 품목 정보
   * @returns 업데이트된 품목 정보
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 수정(관리자)' })
  @ApiResponse({ status: 200, description: '품목 업데이트 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾을 수 없음' })
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  /**
   * 품목 삭제
   * - 관리자 권한 필요
   * - 물리적 삭제 (데이터베이스에서 완전 제거)
   * - 관련된 카트/전표 데이터 확인 필요
   * @param id 품목 ID (uuid)
   * @returns 삭제 성공 메시지
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '품목 삭제(관리자)' })
  @ApiResponse({ status: 200, description: '품목 삭제 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾을 수 없음' })
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}