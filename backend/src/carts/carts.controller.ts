import { Controller, Get, Post, Delete, Body, Param, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CartService } from './carts.service';
import { Response, Request } from 'express';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * 장바구니(Cart) 관리 API 컨트롤러
 * 
 * 장바구니의 CRUD 작업을 처리하는 엔드포인트들을 제공합니다.
 * - 조회: 로그인한 사용자만 접근 가능
 * - 품목 추가: 로그인한 사용자만 접근 가능
 * - 품목 삭제: 로그인한 사용자만 접근 가능
 * - 장바구니 삭제: 로그인한 사용자만 접근 가능
 */
@ApiTags('carts')
@Controller('carts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * 장바구니 조회 API
   * 
   * @description
   * - 현재 로그인한 사용자의 장바구니를 조회합니다
   * - 삭제되지 않은 활성 장바구니만 조회됩니다
   * - 장바구니가 없으면 404 에러를 반환합니다
   * 
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 장바구니 정보
   * 
   * @example
   * GET /api/carts
   * Authorization: Bearer <jwt-token>
   */
  @Get()
  async viewCart(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      const cart = await this.cartService.findByUserId(userId);
      if (!cart) {
        return res.status(HttpStatus.NOT_FOUND).send('장바구니가 존재하지 않습니다');
      }

      return res.status(HttpStatus.OK).json(cart);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 장바구니에 품목 추가 API
   * 
   * @description
   * - 현재 로그인한 사용자의 장바구니에 품목을 추가합니다
   * - 기존 장바구니가 없으면 새로 생성합니다
   * - 기존 장바구니가 있으면 품목을 추가합니다
   * - 품목의 총 금액(amount)을 자동 계산합니다
   * 
   * @param addCartItemDto - 추가할 품목 정보
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 업데이트된 장바구니 정보
   * 
   * @example
   * POST /api/carts
   * Authorization: Bearer <jwt-token>
   * {
   *   "item_id": "item-uuid",
   *   "count": 2,
   *   "price": 8000
   * }
   */
  @Post()
  @ApiBody({ type: AddCartItemDto })
  async addCartItem(
    @Body() addCartItemDto: AddCartItemDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      const cart = await this.cartService.addItem(userId, addCartItemDto);
      return res.status(HttpStatus.OK).json(cart);
    } catch (err: any) {
      if (err.message === '존재하지 않는 품목입니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 장바구니에서 품목 삭제 API
   * 
   * @description
   * - 현재 로그인한 사용자의 장바구니에서 특정 품목을 삭제합니다
   * - 마지막 품목을 삭제하면 장바구니도 삭제됩니다
   * - 품목 ID로 삭제할 품목을 식별합니다
   * 
   * @param itemId - 삭제할 품목 ID
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 업데이트된 장바구니 정보 또는 204 상태 코드 (장바구니가 삭제된 경우)
   * 
   * @example
   * DELETE /api/carts/items/item-uuid
   * Authorization: Bearer <jwt-token>
   */
  @Delete('items/:itemId')
  @ApiParam({ name: 'itemId', description: '삭제할 품목 ID' })
  async removeCartItem(
    @Param('itemId') itemId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      const cart = await this.cartService.removeItem(userId, itemId);
      if (!cart) {
        // 장바구니가 삭제된 경우
        return res.status(HttpStatus.NO_CONTENT).send();
      }
      return res.status(HttpStatus.OK).json(cart);
    } catch (err: any) {
      if (err.message === '장바구니가 존재하지 않습니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }

  /**
   * 장바구니 삭제 API
   * 
   * @description
   * - 현재 로그인한 사용자의 장바구니를 완전히 삭제합니다
   * - 실제로는 deleted 플래그만 true로 설정합니다
   * 
   * @param req - Express Request 객체 (JWT 토큰에서 사용자 정보 추출)
   * @param res - Express Response 객체
   * @returns 성공 시 200 상태 코드
   * 
   * @example
   * DELETE /api/carts
   * Authorization: Bearer <jwt-token>
   */
  @Delete()
  async removeCart(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).send('로그인 후 이용하세요');
      }

      await this.cartService.removeCart(userId);
      return res.status(HttpStatus.OK).send();
    } catch (err: any) {
      if (err.message === '장바구니가 존재하지 않습니다.') {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('서버 오류');
    }
  }
} 