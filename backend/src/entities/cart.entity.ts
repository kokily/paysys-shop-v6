import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Bill } from './bill.entity';

/**
 * 장바구니 아이템 인터페이스
 * 
 * @description
 * 장바구니에 담긴 개별 품목의 정보를 정의합니다.
 * 
 * @example
 * {
 *   "id": "item-uuid",
 *   "name": "김치찌개",
 *   "divide": "식사(중식)",
 *   "native": "회원",
 *   "unit": "인분",
 *   "price": 8000,
 *   "count": 2,
 *   "amount": 16000
 * }
 */
export interface CartItem {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
}

/**
 * 장바구니(Cart) 엔티티
 * 
 * @description
 * 사용자의 장바구니 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 사용자별로 하나의 장바구니를 가지며, 여러 품목을 담을 수 있습니다.
 * 
 * @table cart - 데이터베이스 테이블명
 * 
 * @example
 * // 새로운 장바구니 생성
 * const cart = new Cart();
 * cart.items = [{
 *   id: 'item-uuid',
 *   name: '김치찌개',
 *   divide: '식사(중식)',
 *   native: '회원',
 *   unit: '인분',
 *   price: 8000,
 *   count: 2,
 *   amount: 16000
 * }];
 * cart.user_id = 'user-uuid';
 * await cart.save();
 */
@Entity('cart')
export class Cart extends BaseEntity {
  /**
   * 장바구니 고유 ID
   * 
   * @description
   * 데이터베이스에서 자동으로 생성되는 UUID입니다.
   * 모든 장바구니는 이 ID로 고유하게 식별됩니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 장바구니에 담긴 품목들
   * 
   * @description
   * 장바구니에 담긴 품목들의 배열입니다.
   * JSONB 타입으로 저장되어 유연한 구조를 지원합니다.
   * 각 품목은 id, name, divide, native, unit, price, count, amount 정보를 포함합니다.
   * 
   * @example [{"id": "item-uuid", "name": "김치찌개", "divide": "식사(중식)", "native": "회원", "unit": "인분", "price": 8000, "count": 2, "amount": 16000}]
   */
  @Column('jsonb')
  items: CartItem[];

  /**
   * 장바구니 완료 여부
   * 
   * @description
   * 장바구니가 주문으로 완료되었는지 여부를 나타냅니다.
   * true인 경우 주문이 완료된 장바구니입니다.
   * 
   * @example false
   */
  @Column({ type: 'boolean', default: false })
  completed: boolean;

  /**
   * 장바구니 삭제 여부
   * 
   * @description
   * 장바구니가 삭제되었는지 여부를 나타냅니다.
   * true인 경우 삭제된 장바구니입니다.
   * 
   * @example false
   */
  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  /**
   * 생성 시간
   * 
   * @description
   * 장바구니가 데이터베이스에 처음 저장된 시간입니다.
   * TypeORM이 자동으로 설정하며, 타임스탬프 타입으로 저장됩니다.
   * 
   * @example "2024-01-15T10:30:00.000Z"
   */
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  /**
   * 수정 시간
   * 
   * @description
   * 장바구니 정보가 마지막으로 수정된 시간입니다.
   * TypeORM이 자동으로 업데이트하며, 타임스탬프 타입으로 저장됩니다.
   * 
   * @example "2024-01-15T15:45:00.000Z"
   */
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  /**
   * 사용자 ID
   * 
   * @description
   * 장바구니를 소유한 사용자의 ID입니다.
   * User 엔티티와 ManyToOne 관계를 가집니다.
   * 
   * @example "user-uuid"
   */
  @Column({ nullable: true })
  user_id: string;

  /**
   * 사용자 관계
   * 
   * @description
   * 장바구니를 소유한 사용자와의 관계입니다.
   * ManyToOne 관계로, 한 사용자가 여러 장바구니를 가질 수 있습니다.
   */
  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * 청구서 ID
   * 
   * @description
   * 장바구니와 연결된 청구서의 ID입니다.
   * Bill 엔티티와 OneToOne 관계를 가집니다.
   * 
   * @example "bill-uuid"
   */
  @Column({ nullable: true })
  bill_id: string;

  /**
   * 청구서 관계
   * 
   * @description
   * 장바구니와 연결된 청구서와의 관계입니다.
   * OneToOne 관계로, 하나의 장바구니는 하나의 청구서와 연결됩니다.
   */
  @OneToOne(() => Bill, (bill) => bill.cart)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;
} 