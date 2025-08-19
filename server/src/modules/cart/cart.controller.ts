import type { AuthenticatedRequest } from 'src/types/jwt.types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddCartDto } from './dto/add-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '카트 품목 추가' })
  @ApiResponse({ status: 200, description: '카트에 품목 추가 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾을 수 없습니다.' })
  async addCart(@Body() addCartDto: AddCartDto, @Request() req: AuthenticatedRequest) {
    return this.cartService.addToCart(req.user.user_id, addCartDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '사용자 카트 조회' })
  @ApiResponse({ status: 200, description: '카트 조회 성공' })
  async getCart(@Request() req: AuthenticatedRequest) {
    return this.cartService.getCart(req.user.user_id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '사용자 카트 삭제' })
  @ApiResponse({ status: 201, description: '사용자 카트 삭제 성공' })
  async removeCart(@Request() req: AuthenticatedRequest) {
    return this.cartService.removeCart(req.user.user_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '카트에서 특정 품목 삭제' })
  @ApiResponse({ status: 200, description: '품목 삭제 성공' })
  @ApiResponse({ status: 404, description: '품목을 찾을 수 없음' })
  async removeCartItem(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.cartService.removeCartItem(req.user.user_id, id);
  }
}
