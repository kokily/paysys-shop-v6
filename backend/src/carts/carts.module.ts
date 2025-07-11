import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { Item } from '../entities/item.entity';
import { CartService } from './carts.service';
import { CartController } from './carts.controller';

/**
 * 장바구니(Cart) 모듈
 * 
 * @description
 * 장바구니 관련 기능을 제공하는 모듈입니다.
 * - Cart 엔티티와 Item 엔티티를 사용합니다
 * - CartService와 CartController를 포함합니다
 * - 다른 모듈에서 CartService를 사용할 수 있도록 export합니다
 */
@Module({
  imports: [TypeOrmModule.forFeature([Cart, Item])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {} 