import { 
  Controller, 
  Get,
  Post, 
  Delete, 
  Body, 
  Param, 
  Res, 
  HttpStatus, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { Response, Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { AddReserveDto } from './dto/add-reserve.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * 예약금(Reserve) 관리 API 컨트롤러
 * 
 * 예약금과 관련된 작업을 처리하는 엔드포인트들을 제공합니다.
 * - 추가: 관리자만 접근 가능
 * - 삭제: 관리자만 접근 가능
 * - 조회: 로그인한 사용자만 접근 가능
 */
@ApiTags('reserve')
@Controller('reserve')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  /**
   * 예약금 추가 API
   * 
   * @description
   * - 특정 청구서에 예약금을 추가합니다
   * - 관리자만 접근 가능합니다
   * - 청구서가 존재하는지 확인합니다
   * 
   * @param addReserveDto - 예약금 추가 정보
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 업데이트된 청구서 정보
   * 
   * @example
   * POST /api/reserve
   * Authorization: Bearer <jwt-token>
   * {
   *   "bill_id": "bill-uuid",
   *   "reserve": 10000
   * }
   */
  @Post()
  @ApiBody({ type: AddReserveDto })
  async addReserve(
    @Body() addReserveDto: AddReserveDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }

      const bill = await this.reserveService.addReserve(addReserveDto);
      return res.status(HttpStatus.OK).json(bill);
    } catch (err: any) {
      if (err.message === '존재하지 않는 청구서입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 예약금 삭제 API
   * 
   * @description
   * - 특정 청구서의 예약금을 삭제합니다 (0으로 설정)
   * - 관리자만 접근 가능합니다
   * - 청구서가 존재하는지 확인합니다
   * - 예약금이 있는지 확인합니다
   * 
   * @param id - 예약금을 삭제할 청구서 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 업데이트된 청구서 정보
   * 
   * @example
   * DELETE /api/reserve/bill-uuid
   * Authorization: Bearer <jwt-token>
   */
  @Delete(':id')
  @ApiParam({ name: 'id', description: '예약금을 삭제할 청구서 ID' })
  async removeReserve(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }

      const bill = await this.reserveService.removeReserve(id);
      return res.status(HttpStatus.OK).json(bill);
    } catch (err: any) {
      if (err.message === '존재하지 않는 청구서입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      if (err.message === '예약금이 없습니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 예약금 조회 API
   * 
   * @description
   * - 특정 청구서의 예약금 정보를 조회합니다
   * - 로그인한 사용자만 접근 가능합니다
   * 
   * @param id - 조회할 청구서 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 청구서 정보 (예약금 포함)
   * 
   * @example
   * GET /api/reserve/bill-uuid
   * Authorization: Bearer <jwt-token>
   */
  @Get(':id')
  @ApiParam({ name: 'id', description: '조회할 청구서 ID' })
  async getReserve(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      const bill = await this.reserveService.getReserve(id);
      
      // 본인이 아닌 다른 사용자의 청구서를 조회하려는 경우 관리자 권한 확인
      if (bill.user_id !== userId) {
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
} 