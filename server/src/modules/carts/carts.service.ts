import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart, CartItem } from "src/entities/cart.entity";
import { Item } from "src/entities/item.entity";
import { Repository } from "typeorm";
import { AddCartDto } from "./dto/add-cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}
  
  /**
   * 사용자 ID로 카트 조회 (내부 메서드)
   * - 삭제 여부와 관계없이 조회
   * @param userId 사용자 ID
   * @returns 카트 정보 또는 null
   */
  private async getCartByUserId(userId: string): Promise<Cart | null> {
    return await this.cartRepository.findOne({
      where: { user_id: userId },
    });
  }

  /**
   * 카트에 품목 추가
   * - 품목 존재 확인
   * - 기존 카트 조회 또는 카트 생성
   * - 품목 정보와 수량으로 CartItem 생성
   * - 카트에 품목 추가
   * @param userId 사용자 ID
   * @param addCartDto 추가할 품목 정보
   * @returns 업데이트된 카트
   */
  async addToCart(userId: string, addCartDto: AddCartDto): Promise<Cart> {
    const { item_id, count, price } = addCartDto;

    // 품목 존재 확인
    const item = await this.itemRepository.findOne({ where: { id: item_id } });

    if (!item) {
      throw new NotFoundException('존재하지 않는 품목입니다.');
    }

    // 기존 카트 조회
    let cart = await this.getCartByUserId(userId);

    // 업데이트 CartItem 생성
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      divide: item.divide,
      native: item.native,
      unit: item.unit,
      price: price,
      count: count,
      amount: count * price,
    };

    if (!cart) {
      // 새 카트 생성
      cart = this.cartRepository.create({
        user_id: userId,
        items: [cartItem],
        completed: false,
        deleted: false,
      });
    } else {
      // 기존 카트에 품목 추가
      cart.items = [...cart.items, cartItem];
    }

    return await this.cartRepository.save(cart);
  }

  /**
   * 사용자 카트 조회
   * - 삭제되지 않은 카트만 조회
   * - 카트가 없으면 null 반환
   * @param userId 사용자 ID (JWT Guard에서 주입)
   * @returns 카트 정보 또는 null
   */
  async getCart(userId: string): Promise<Cart | null> {
    return await this.cartRepository.findOne({
      where: {
        user_id: userId,
        deleted: false,
      },
    });
  }

  /**
   * 카트 전체 삭제
   * - 물리적 삭제가 아닌 deleted 플래그 설정
   * @param userId 사용자 ID (JWT Guard에서 주입)
   * @returns 삭제 성공 메시지
   */
  async removeCart(userId: string): Promise<{ message: string }> {
    const cart = await this.getCartByUserId(userId);

    if (cart) {
      cart.deleted = true;

      await this.cartRepository.save(cart);
    }

    return {
      message: '카트가 삭제되었습니다.'
    }
  }

  /**
   * 카트에서 특정 품목 삭제
   * - 아이템 ID로 장바구니에서 해당 아이템 제거
   * - 아이템이 없으면 에러 발생
   * @param userId 사용자 ID (JWT Guard에서 주입)
   * @param itemId 삭제할 아이템 ID
   * @returns 업데이트된 카트
   */
  async removeCartItem(userId: string, itemId: string): Promise<Cart> {
    const cart = await this.getCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('카트를 찾을 수 없습니다.');
    }

    // 품목 ID로 필터링하여 해당 품목 제거
    const updatedItems = cart.items.filter(item => item.id !== itemId);

    if (updatedItems.length === cart.items.length) {
      throw new NotFoundException('해당 품목을 찾을 수 없습니다.');
    }

    cart.items = updatedItems;

    return await this.cartRepository.save(cart);
  }
}