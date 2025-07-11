import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from '../entities/cart.entity';
import { Item } from '../entities/item.entity';
import { AddCartItemDto } from './dto/add-cart-item.dto';

/**
 * 장바구니(Cart) 비즈니스 로직 서비스
 * 
 * 장바구니와 관련된 모든 데이터베이스 작업과 비즈니스 로직을 처리합니다.
 * - 장바구니 조회
 * - 품목 추가
 * - 품목 삭제
 * - 장바구니 삭제
 */
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  /**
   * 사용자의 장바구니 조회
   * 
   * @description
   * - 특정 사용자의 활성 장바구니를 조회합니다
   * - 삭제되지 않은 장바구니만 조회합니다
   * - 장바구니가 없으면 null을 반환합니다
   * 
   * @param userId - 조회할 사용자 ID
   * @returns 장바구니 정보 또는 null
   * 
   * @example
   * const cart = await cartService.findByUserId('user-uuid');
   * if (cart) {
   *   console.log(cart.items.length, '개 품목');
   * }
   */
  async findByUserId(userId: string): Promise<Cart | null> {
    return this.cartRepository.findOne({
      where: { user_id: userId, deleted: false },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * 장바구니에 품목 추가
   * 
   * @description
   * - 사용자의 장바구니에 새로운 품목을 추가합니다
   * - 기존 장바구니가 없으면 새로 생성합니다
   * - 기존 장바구니가 있으면 품목을 추가합니다
   * - 품목의 총 금액(amount)을 자동 계산합니다
   * 
   * @param userId - 사용자 ID
   * @param addCartItemDto - 추가할 품목 정보
   * @returns 업데이트된 장바구니 정보
   * @throws 존재하지 않는 품목인 경우
   * 
   * @example
   * const updatedCart = await cartService.addItem('user-uuid', {
   *   item_id: 'item-uuid',
   *   count: 2,
   *   price: 8000
   * });
   */
  async addItem(userId: string, addCartItemDto: AddCartItemDto): Promise<Cart> {
    const { item_id, count, price } = addCartItemDto;

    // 품목 존재 여부 확인
    const item = await this.itemRepository.findOne({ where: { id: item_id } });
    if (!item) {
      throw new Error('존재하지 않는 품목입니다.');
    }

    // 기존 장바구니 조회
    const existingCart = await this.findByUserId(userId);

    // 추가할 품목 정보 구성
    const addItem: CartItem = {
      ...item,
      count,
      price,
      amount: count * price,
    };

    if (!existingCart) {
      // 기존 장바구니가 없으면 새로 생성
      const cart = this.cartRepository.create({
        items: [addItem],
        user_id: userId,
        completed: false,
        deleted: false,
      });
      return this.cartRepository.save(cart);
    } else {
      // 기존 장바구니에 품목 추가
      const updatedItems = [...existingCart.items, addItem];
      await this.cartRepository.update(
        { id: existingCart.id },
        { items: updatedItems }
      );
      
      const updatedCart = await this.cartRepository.findOne({ where: { id: existingCart.id } });
      if (!updatedCart) {
        throw new Error('장바구니 업데이트에 실패했습니다.');
      }
      return updatedCart;
    }
  }

  /**
   * 장바구니에서 품목 삭제
   * 
   * @description
   * - 장바구니에서 특정 품목을 삭제합니다
   * - 마지막 품목을 삭제하면 장바구니도 삭제됩니다
   * - 품목 ID로 삭제할 품목을 식별합니다
   * 
   * @param userId - 사용자 ID
   * @param itemId - 삭제할 품목 ID
   * @returns 업데이트된 장바구니 정보 또는 null (장바구니가 삭제된 경우)
   * @throws 장바구니가 존재하지 않는 경우
   * 
   * @example
   * const updatedCart = await cartService.removeItem('user-uuid', 'item-uuid');
   */
  async removeItem(userId: string, itemId: string): Promise<Cart | null> {
    const cart = await this.findByUserId(userId);
    if (!cart) {
      throw new Error('장바구니가 존재하지 않습니다.');
    }

    if (cart.items.length === 1) {
      // 마지막 품목이면 장바구니 삭제
      await this.cartRepository.update(
        { id: cart.id },
        { deleted: true }
      );
      return null;
    } else {
      // 품목만 삭제
      const updatedItems = cart.items.filter(item => item.id !== itemId);
      await this.cartRepository.update(
        { id: cart.id },
        { items: updatedItems }
      );
      
      const updatedCart = await this.cartRepository.findOne({ where: { id: cart.id } });
      if (!updatedCart) {
        throw new Error('장바구니 업데이트에 실패했습니다.');
      }
      return updatedCart;
    }
  }

  /**
   * 장바구니 삭제
   * 
   * @description
   * - 사용자의 장바구니를 완전히 삭제합니다
   * - 실제로는 deleted 플래그만 true로 설정합니다
   * 
   * @param userId - 사용자 ID
   * @throws 장바구니가 존재하지 않는 경우
   * 
   * @example
   * await cartService.removeCart('user-uuid');
   */
  async removeCart(userId: string): Promise<void> {
    const cart = await this.findByUserId(userId);
    if (!cart) {
      throw new Error('장바구니가 존재하지 않습니다.');
    }

    await this.cartRepository.update(
      { id: cart.id },
      { deleted: true }
    );
  }
} 