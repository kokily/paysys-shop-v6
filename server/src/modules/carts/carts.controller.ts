import type { AuthenticatedRequest } from "src/types/auth.types";
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AddCartDto } from "./dto/add-cart.dto";
import { CartService } from "./carts.service";

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * 카트에 품목 추가
   * - 기존 카트가 있으면 품목(Item) 추가
   * - 기존 카트가 없으면 카트 새로 생성
   * - 품목 존재 여부 확인
   * - 수량과 단가로 총액 계산
   * @param addCartDto 추가할 품목 정보
   * @param req 인증된 사용자 정보
   * @returns 업데이트된 카트 정보
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '카트에 품목 추가' })
  @ApiResponse({ status: 201, description: '품목 추가 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾을 수 없음' })
  async addToCart(
    @Body() addCartDto: AddCartDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.cartService.addToCart(req.user.user_id, addCartDto);
  }

  /**
   * 카트 조회
   * - 현재 사용자의 카트 정보 반환
   * - 카트가 없으면 빈 배열 반환
   * - 삭제된 카트는 제외
   * @param req 인증된 사용자 정보
   * @returns 카트 정보
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '카트 조회' })
  @ApiResponse({ status: 200, description: '카트 조회 성공' })
  async getCart(@Request() req: AuthenticatedRequest) {
    return this.cartService.getCart(req.user.user_id);
  }

  /**
   * 카트 전체 삭제
   * - 현재 사용자의 카트 완전히 삭제
   * - 물리적 삭제가 아닌 deleted 플래그 설정
   * @param req 인증된 사용자 정보
   * @returns 삭제 성공 메시지
   */
  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '카트 전체 삭제' })
  @ApiResponse({ status: 200, description: '카트 삭제 성공' })
  async removeCart(@Request() req: AuthenticatedRequest) {
    return this.cartService.removeCart(req.user.user_id);
  }

  /**
   * 카트에서 특정 품목 제거
   * - 카트에서 특정 아이템만 제거
   * - Item id로 식별하여 삭제
   * @param id 삭제할 Item id
   * @param req 인증된 사용자 정보
   * @returns 업데이트된 카트 정보
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '카트에서 특정 품목 삭제' })
  @ApiResponse({ status: 200, description: '품목 삭제 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾을 수 없음' })
  async removeCartItem(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.cartService.removeCartItem(req.user.user_id, id);
  }
}