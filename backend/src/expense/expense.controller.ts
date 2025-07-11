import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Response, Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('expense')
@Controller('expense')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  /**
   * 비용(Expense) 등록 API
   *
   * @description
   * - 웨딩 및 관련 엔티티(Company, Convention 등)를 한 번에 생성합니다
   * - 관리자만 접근 가능합니다
   *
   * @param expenseDto - 비용 등록 정보
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 생성된 웨딩 ID
   *
   * @example
   * POST /api/expense
   * Authorization: Bearer <jwt-token>
   * { ... }
   */
  @Post()
  @ApiBody({ type: ExpenseDto })
  async addExpense(
    @Body() expenseDto: ExpenseDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }
      const result = await this.expenseService.addExpense(expenseDto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (err: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 비용(Expense) 수정 API
   *
   * @description
   * - 웨딩 및 관련 엔티티(Company, Convention 등)를 한 번에 수정합니다
   * - 관리자만 접근 가능합니다
   *
   * @param updateExpenseDto - 비용 수정 정보
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 성공 시 204 상태 코드
   *
   * @example
   * PUT /api/expense
   * Authorization: Bearer <jwt-token>
   * { ... }
   */
  @Put()
  @ApiBody({ type: UpdateExpenseDto })
  async updateExpense(
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }
      await this.expenseService.updateExpense(updateExpenseDto);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (err: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 비용(Expense) 삭제 API
   *
   * @description
   * - 웨딩 및 관련 엔티티(Company, Convention 등)를 한 번에 삭제합니다
   * - 관리자만 접근 가능합니다
   *
   * @param id - 삭제할 웨딩 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 성공 시 204 상태 코드
   *
   * @example
   * DELETE /api/expense/:id
   * Authorization: Bearer <jwt-token>
   */
  @Delete(':id')
  @ApiParam({ name: 'id', description: '삭제할 웨딩 ID' })
  async removeExpense(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const isAdmin = (req as any).user?.admin;
      if (!isAdmin) {
        return res.status(HttpStatus.FORBIDDEN).send('관리자만 접근 가능합니다');
      }
      await this.expenseService.removeExpense(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (err: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 