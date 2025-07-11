import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Cart } from './cart.entity';
import { Bill } from './bill.entity';

/**
 * 사용자(User) 엔티티
 * 
 * @description
 * 시스템 사용자 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 사용자 인증, 권한 관리, 장바구니, 청구서 등의 기능과 연결됩니다.
 * 
 * @table user - 데이터베이스 테이블명
 * 
 * @example
 * // 새로운 사용자 생성
 * const user = new User();
 * user.username = 'testuser';
 * user.password = 'hashedPassword';
 * user.admin = false;
 * await user.save();
 */
@Entity('user')
export class User {
  /**
   * 사용자 고유 ID
   * 
   * @description
   * 데이터베이스에서 자동으로 생성되는 UUID입니다.
   * 모든 사용자는 이 ID로 고유하게 식별됩니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 사용자명
   * 
   * @description
   * 사용자의 로그인 아이디입니다.
   * 시스템 내에서 고유해야 하며, 로그인 시 사용됩니다.
   * 
   * @example "testuser"
   */
  @Column({ type: 'text', unique: true })
  username: string;

  /**
   * 비밀번호
   * 
   * @description
   * 사용자의 암호화된 비밀번호입니다.
   * bcrypt로 해시화되어 저장됩니다.
   * 
   * @example "hashedPassword"
   */
  @Column({ type: 'text' })
  password: string;

  /**
   * 관리자 권한
   * 
   * @description
   * 사용자의 관리자 권한 여부입니다.
   * true인 경우 관리자 권한을 가집니다.
   * 
   * @example false
   */
  @Column({ type: 'boolean', default: false })
  admin: boolean;

  /**
   * 생성 시간
   * 
   * @description
   * 사용자가 데이터베이스에 처음 저장된 시간입니다.
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
   * 사용자 정보가 마지막으로 수정된 시간입니다.
   * TypeORM이 자동으로 업데이트하며, 타임스탬프 타입으로 저장됩니다.
   * 
   * @example "2024-01-15T15:45:00.000Z"
   */
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  /**
   * 사용자의 장바구니들
   * 
   * @description
   * 사용자가 소유한 장바구니들과의 관계입니다.
   * OneToMany 관계로, 한 사용자가 여러 장바구니를 가질 수 있습니다.
   */
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  /**
   * 사용자의 청구서들
   * 
   * @description
   * 사용자가 소유한 청구서들과의 관계입니다.
   * OneToMany 관계로, 한 사용자가 여러 청구서를 가질 수 있습니다.
   */
  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];
} 