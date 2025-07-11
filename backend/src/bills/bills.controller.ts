import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Patch,
  Body, 
  Param, 
  Query, 
  Res, 
  HttpStatus, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { BillService } from './bills.service';
import { Response, Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateBillDto } from './dto/create-bill.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * 청구서(Bill) 관리 API 컨트롤러
 * 
 * 청구서의 CRUD 작업을 처리하는 엔드포인트들을 제공합니다.
 * - 생성: 로그인한 사용자만 접근 가능
 * - 조회: 로그인한 사용자만 접근 가능
 * - 목록 조회: 로그인한 사용자만 접근 가능
 * - 삭제: 본인 또는 관리자만 접근 가능
 * - 복원: 본인만 접근 가능
 */
@ApiTags('bills')
@Controller('bills')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BillController {
  constructor(private readonly billService: BillService) {}

  /**
   * 청구서 생성 API
   * 
   * @description
   * - 현재 로그인한 사용자의 장바구니를 기반으로 청구서를 생성합니다
   * - 장바구니의 품목들을 청구서에 복사합니다
   * - 총 금액을 자동 계산합니다
   * - 장바구니를 completed 상태로 변경합니다
   * 
   * @param createBillDto - 청구서 생성 정보
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 생성된 청구서 정보
   * 
   * @example
   * POST /api/bills
   * Authorization: Bearer <jwt-token>
   * {
   *   "title": "2024년 1월 청구서",
   *   "hall": "대연홀",
   *   "etc": "추가 요청사항"
   * }
   */
  @Post()
  @ApiBody({ type: CreateBillDto })
  async createBill(
    @Body() createBillDto: CreateBillDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = (req as any).user?.userId;
      const username = (req as any).user?.username;
      
      if (!userId || !username) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      const bill = await this.billService.createBill(userId, username, createBillDto);
      return res.status(HttpStatus.CREATED).json(bill);
    } catch (err: any) {
      if (
        err.message === '장바구니가 존재하지 않습니다.' ||
        err.message === '빌지가 존재하지 않습니다.' ||
        err.message === '장바구니가 비어있습니다.'
      ) {
        return res.status(HttpStatus.NOT_FOUND).send('장바구니가 비어있습니다.');
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 청구서 목록 조회 API
   * 
   * @description
   * - 청구서 목록을 조회합니다
   * - 페이지네이션을 지원합니다
   * - 검색 기능을 지원합니다 (제목, 홀)
   * 
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @param userId - 조회할 사용자 ID (선택사항)
   * @param title - 제목 검색 (선택사항)
   * @param hall - 홀 검색 (선택사항)
   * @param cursor - 커서 기반 페이지네이션 (선택사항)
   * @param limit - 조회할 개수 (기본값: 30)
   * @returns 청구서 목록
   * 
   * @example
   * GET /api/bills?userId=user-uuid&title=청구서&hall=대연홀&limit=20
   * Authorization: Bearer <jwt-token>
   */
  @Get()
  @ApiQuery({ name: 'userId', required: false, description: '조회할 사용자 ID' })
  @ApiQuery({ name: 'title', required: false, description: '제목 검색' })
  @ApiQuery({ name: 'hall', required: false, description: '홀 검색' })
  @ApiQuery({ name: 'cursor', required: false, description: '커서 기반 페이지네이션' })
  @ApiQuery({ name: 'limit', required: false, description: '조회할 개수 (기본값: 30)' })
  async getBills(
    @Req() req: Request,
    @Res() res: Response,
    @Query('userId') userId?: string,
    @Query('title') title?: string,
    @Query('hall') hall?: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    try {
      const currentUserId = (req as any).user?.userId;
      if (!currentUserId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      // 본인이 아닌 다른 사용자의 청구서를 조회하려는 경우 관리자 권한 확인
      if (userId && userId !== currentUserId) {
        const isAdmin = (req as any).user?.admin;
        if (!isAdmin) {
          return res.status(HttpStatus.FORBIDDEN).send('조회 권한이 없습니다');
        }
      }

      const limitNumber = limit ? parseInt(limit, 10) : 30;
      const bills = await this.billService.findBills(userId, title, hall, cursor, limitNumber);
      return res.status(HttpStatus.OK).json(bills);
    } catch (err: any) {
      if (err.message === '해당 청구서가 존재하지 않습니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 청구서 상세 조회 API
   * 
   * @description
   * - 특정 청구서의 상세 정보를 조회합니다
   * 
   * @param id - 청구서 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 청구서 정보
   * 
   * @example
   * GET /api/bills/bill-uuid
   * Authorization: Bearer <jwt-token>
   */
  @Get(':id')
  @ApiParam({ name: 'id', description: '청구서 ID' })
  async getBill(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const currentUserId = (req as any).user?.userId;
      if (!currentUserId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      const bill = await this.billService.findById(id);
      
      // 본인이 아닌 다른 사용자의 청구서를 조회하려는 경우 관리자 권한 확인
      if (bill.user_id !== currentUserId) {
        const isAdmin = (req as any).user?.admin;
        if (!isAdmin) {
          return res.status(HttpStatus.FORBIDDEN).send('조회 권한이 없습니다');
        }
      }

      return res.status(HttpStatus.OK).json(bill);
    } catch (err: any) {
      if (err.message === '존재하지 않는 청구서입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 청구서 삭제 API
   * 
   * @description
   * - 특정 청구서를 삭제합니다
   * - 본인 또는 관리자만 삭제 가능합니다
   * 
   * @param id - 삭제할 청구서 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 성공 시 204 상태 코드
   * 
   * @example
   * DELETE /api/bills/bill-uuid
   * Authorization: Bearer <jwt-token>
   */
  @Delete(':id')
  @ApiParam({ name: 'id', description: '삭제할 청구서 ID' })
  async removeBill(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = (req as any).user?.userId;
      const isAdmin = (req as any).user?.admin;
      
      if (!userId && !isAdmin) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      await this.billService.removeBill(id, userId, isAdmin);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (err: any) {
      if (err.message === '존재하지 않는 청구서입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      if (err.message === '삭제 권한이 없습니다.') {
        return res.status(HttpStatus.FORBIDDEN).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 청구서 복원 API (장바구니로 되돌리기)
   * 
   * @description
   * - 청구서를 삭제하고 연결된 장바구니를 다시 활성화합니다
   * - 본인만 복원 가능합니다
   * 
   * @param id - 복원할 청구서 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 복원된 장바구니 정보
   * 
   * @example
   * PATCH /api/bills/bill-uuid
   * Authorization: Bearer <jwt-token>
   */
  @Patch(':id')
  @ApiParam({ name: 'id', description: '복원할 청구서 ID' })
  async restoreBill(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      const cart = await this.billService.restoreBill(id, userId);
      return res.status(HttpStatus.OK).json(cart);
    } catch (err: any) {
      if (err.message === '존재하지 않는 청구서입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      if (err.message === '복원 권한이 없습니다.') {
        return res.status(HttpStatus.FORBIDDEN).send(err.message);
      }
      if (err.message === '존재하지 않는 장바구니입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 