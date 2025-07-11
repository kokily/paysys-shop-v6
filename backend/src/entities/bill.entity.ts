import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Cart, CartItem } from './cart.entity';

/**
 * 청구서(Bill) 엔티티
 * 
 * @description
 * 사용자의 청구서 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 장바구니와 연결되어 주문 정보를 관리합니다.
 * 
 * @table bill - 데이터베이스 테이블명
 * 
 * @example
 * // 새로운 청구서 생성
 * const bill = new Bill();
 * bill.title = '2024년 1월 청구서';
 * bill.hall = '대연홀';
 * bill.etc = '추가 요청사항';
 * bill.total_amount = 50000;
 * bill.items = [{
 *   id: 'item-uuid',
 *   name: '김치찌개',
 *   divide: '식사(중식)',
 *   native: '회원',
 *   unit: '인분',
 *   price: 8000,
 *   count: 2,
 *   amount: 16000
 * }];
 * bill.user_id = 'user-uuid';
 * await bill.save();
 */
@Entity('bill')
export class Bill extends BaseEntity {
  /**
   * 청구서 고유 ID
   * 
   * @description
   * 데이터베이스에서 자동으로 생성되는 UUID입니다.
   * 모든 청구서는 이 ID로 고유하게 식별됩니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 청구서 제목
   * 
   * @description
   * 청구서의 제목입니다.
   * 
   * @example "2024년 1월 청구서"
   */
  @Column('text')
  title: string;

  /**
   * 홀 정보
   * 
   * @description
   * 청구서와 관련된 홀 정보입니다.
   * 
   * @example "대연홀"
   */
  @Column('text')
  hall: string;

  /**
   * 기타 정보
   * 
   * @description
   * 청구서와 관련된 기타 정보나 요청사항입니다.
   * 
   * @example "추가 요청사항"
   */
  @Column('text')
  etc: string;

  /**
   * 총 금액
   * 
   * @description
   * 청구서의 총 금액입니다.
   * 
   * @example 50000
   */
  @Column()
  total_amount: number;

  /**
   * 청구서에 포함된 품목들
   * 
   * @description
   * 청구서에 포함된 품목들의 배열입니다.
   * JSONB 타입으로 저장되어 유연한 구조를 지원합니다.
   * 
   * @example [{"id": "item-uuid", "name": "김치찌개", "divide": "식사(중식)", "native": "회원", "unit": "인분", "price": 8000, "count": 2, "amount": 16000}]
   */
  @Column('jsonb')
  items: CartItem[];

  /**
   * 예약 정보
   * 
   * @description
   * 청구서와 관련된 예약 정보입니다.
   * 
   * @example 1
   */
  @Column({ nullable: true })
  reserve: number;

  /**
   * 생성 시간
   * 
   * @description
   * 청구서가 데이터베이스에 처음 저장된 시간입니다.
   * TypeORM이 자동으로 설정하며, 타임스탬프 타입으로 저장됩니다.
   * 
   * @example "2024-01-15T10:30:00.000Z"
   */
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  /**
   * 장바구니 ID
   * 
   * @description
   * 청구서와 연결된 장바구니의 ID입니다.
   * Cart 엔티티와 OneToOne 관계를 가집니다.
   * 
   * @example "cart-uuid"
   */
  @Column({ nullable: true })
  cart_id: string;

  /**
   * 장바구니 관계
   * 
   * @description
   * 청구서와 연결된 장바구니와의 관계입니다.
   * OneToOne 관계로, 하나의 청구서는 하나의 장바구니와 연결됩니다.
   */
  @OneToOne(() => Cart, (cart) => cart.bill)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  /**
   * 사용자 ID
   * 
   * @description
   * 청구서를 소유한 사용자의 ID입니다.
   * User 엔티티와 ManyToOne 관계를 가집니다.
   * 
   * @example "user-uuid"
   */
  @Column({ nullable: true })
  user_id: string;

  /**
   * 사용자명
   * 
   * @description
   * 청구서를 소유한 사용자의 이름입니다.
   * 
   * @example "홍길동"
   */
  @Column({ nullable: true })
  username: string;

  /**
   * 사용자 관계
   * 
   * @description
   * 청구서를 소유한 사용자와의 관계입니다.
   * ManyToOne 관계로, 한 사용자가 여러 청구서를 가질 수 있습니다.
   */
  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user: User;
} 