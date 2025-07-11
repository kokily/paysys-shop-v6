import { Controller, Get, Post, Put, Delete, Query, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ItemService } from './items.service';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ItemListQueryDto } from './dto/item-list-query.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

/**
 * 품목(Item) 관리 API 컨트롤러
 * 
 * 품목의 CRUD 작업을 처리하는 엔드포인트들을 제공합니다.
 * - 목록 조회: 모든 사용자 접근 가능
 * - 상세 조회: 모든 사용자 접근 가능  
 * - 생성/수정/삭제: 관리자만 접근 가능
 */
@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  /**
   * 품목 목록 조회 API
   * 
   * @description
   * - 품목 목록을 페이징과 필터링을 통해 조회합니다
   * - 최대 30개씩 조회되며, 품목 번호(num) 기준 내림차순 정렬됩니다
   * - 식사 종류(divide), 회원 등급(native), 품목명(name)으로 필터링 가능합니다
   * - 커서 기반 페이징을 지원합니다
   * 
   * @param query - 조회 조건 (divide, native, name, cursor)
   * @param res - Express Response 객체
   * @returns 품목 목록 배열
   * 
   * @example
   * GET /api/items?divide=식사(중식)&native=회원&name=김치찌개&cursor=item-id
   */
  @Get()
  async list(
    @Query() query: ItemListQueryDto,
    @Res() res: Response,
  ) {
    try {
      const items = await this.itemService.list(query);
      return res.status(HttpStatus.OK).json(items);
    } catch (err: any) {
      if (err.message === '존재하지 않는 품목입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 품목 상세 조회 API
   * 
   * @description
   * - 특정 품목의 상세 정보를 조회합니다
   * - 존재하지 않는 품목 ID인 경우 404 에러를 반환합니다
   * 
   * @param id - 품목 ID (UUID)
   * @param res - Express Response 객체
   * @returns 품목 상세 정보
   * 
   * @example
   * GET /api/items/123e4567-e89b-12d3-a456-426614174000
   */
  @Get(':id')
  @ApiParam({ name: 'id', description: '품목 ID' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const item = await this.itemService.findOne(id);
      if (!item) {
        return res.status(HttpStatus.NOT_FOUND).send('존재하지 않는 품목입니다.');
      }
      return res.status(HttpStatus.OK).json(item);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 품목 생성 API
   * 
   * @description
   * - 새로운 품목을 생성합니다
   * - 관리자 권한이 필요합니다 (JWT 토큰 + Admin 권한)
   * - 품목 번호(num)는 중복되지 않아야 합니다
   * - 모든 필수 필드가 입력되어야 합니다
   * 
   * @param createItemDto - 생성할 품목 정보
   * @param res - Express Response 객체
   * @returns 생성된 품목 정보
   * 
   * @example
   * POST /api/items
   * {
   *   "num": 1001,
   *   "name": "김치찌개",
   *   "divide": "식사(중식)",
   *   "native": "회원",
   *   "unit": "인분",
   *   "price": 8000
   * }
   */
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateItemDto })
  async create(@Body() createItemDto: CreateItemDto, @Res() res: Response) {
    try {
      const item = await this.itemService.create(createItemDto);
      return res.status(HttpStatus.CREATED).json(item);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 품목 수정 API
   * 
   * @description
   * - 기존 품목의 정보를 수정합니다
   * - 관리자 권한이 필요합니다 (JWT 토큰 + Admin 권한)
   * - 존재하지 않는 품목 ID인 경우 404 에러를 반환합니다
   * - 부분 업데이트를 지원합니다 (전송된 필드만 수정)
   * 
   * @param id - 수정할 품목 ID (UUID)
   * @param updateItemDto - 수정할 품목 정보 (선택적 필드)
   * @param res - Express Response 객체
   * @returns 수정된 품목 정보
   * 
   * @example
   * PUT /api/items/123e4567-e89b-12d3-a456-426614174000
   * {
   *   "name": "김치찌개(대)",
   *   "price": 10000
   * }
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '품목 ID' })
  @ApiBody({ type: UpdateItemDto })
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @Res() res: Response,
  ) {
    try {
      const item = await this.itemService.update(id, updateItemDto);
      return res.status(HttpStatus.OK).json(item);
    } catch (err: any) {
      if (err.message === '존재하지 않는 품목입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 품목 삭제 API
   * 
   * @description
   * - 특정 품목을 삭제합니다
   * - 관리자 권한이 필요합니다 (JWT 토큰 + Admin 권한)
   * - 존재하지 않는 품목 ID인 경우 404 에러를 반환합니다
   * - 삭제 후 204 상태 코드를 반환합니다 (응답 본문 없음)
   * 
   * @param id - 삭제할 품목 ID (UUID)
   * @param res - Express Response 객체
   * @returns 성공 시 204 상태 코드
   * 
   * @example
   * DELETE /api/items/123e4567-e89b-12d3-a456-426614174000
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: '품목 ID' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.itemService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (err: any) {
      if (err.message === '존재하지 않는 품목입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 