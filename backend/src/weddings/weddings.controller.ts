import { 
  Controller, 
  Get, 
  Param, 
  Query, 
  Res, 
  HttpStatus, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { WeddingsService } from './weddings.service';
import { Response, Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * 웨딩(Wedding) 관리 API 컨트롤러
 * 
 * 웨딩과 관련된 작업을 처리하는 엔드포인트들을 제공합니다.
 * - 목록 조회: 관리자만 접근 가능
 * - 상세 조회: 관리자만 접근 가능
 */
@ApiTags('weddings')
@Controller('weddings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  /**
   * 웨딩 목록 조회 API
   * 
   * @description
   * - 웨딩 목록을 조회합니다
   * - 페이지네이션을 지원합니다
   * - 날짜 검색 기능을 지원합니다
   * - 관리자만 접근 가능합니다
   * 
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @param date - 날짜 검색 (선택사항)
   * @param cursor - 커서 기반 페이지네이션 (선택사항)
   * @param limit - 조회할 개수 (기본값: 40)
   * @returns 웨딩 목록
   * 
   * @example
   * GET /api/weddings?date=2024-06&cursor=wedding-uuid&limit=20
   * Authorization: Bearer <jwt-token>
   */
  @Get()
  @ApiQuery({ name: 'date', required: false, description: '날짜 검색' })
  @ApiQuery({ name: 'cursor', required: false, description: '커서 기반 페이지네이션' })
  @ApiQuery({ name: 'limit', required: false, description: '조회할 개수 (기본값: 40)' })
  async getWeddings(
    @Req() req: Request,
    @Res() res: Response,
    @Query('date') date?: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }

      const limitNumber = limit ? parseInt(limit, 10) : 40;
      const weddings = await this.weddingsService.findWeddings(date, cursor, limitNumber);
      return res.status(HttpStatus.OK).json(weddings);
    } catch (err: any) {
      if (err.message === '해당 웨딩이 존재하지 않습니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 웨딩 상세 조회 API
   * 
   * @description
   * - 특정 웨딩의 상세 정보를 조회합니다
   * - 관련된 모든 엔티티 정보를 포함합니다
   * - 관리자만 접근 가능합니다
   * 
   * @param id - 웨딩 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 웨딩 상세 정보
   * 
   * @example
   * GET /api/weddings/wedding-uuid
   * Authorization: Bearer <jwt-token>
   */
  @Get(':id')
  @ApiParam({ name: 'id', description: '웨딩 ID' })
  async getWedding(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }

      const weddingDetail = await this.weddingsService.findById(id);
      return res.status(HttpStatus.OK).json(weddingDetail);
    } catch (err: any) {
      if (err.message === '존재하지 않는 웨딩입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 