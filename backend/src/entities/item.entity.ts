import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

/**
 * 품목(Item) 엔티티
 * 
 * @description
 * 품목 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * TypeORM의 BaseEntity를 상속받아 기본적인 CRUD 메서드들을 사용할 수 있습니다.
 * 
 * @table item - 데이터베이스 테이블명
 * 
 * @example
 * // 새로운 품목 생성
 * const item = new Item();
 * item.num = 1001;
 * item.name = '김치찌개';
 * item.divide = '식사(중식)';
 * item.native = '회원';
 * item.unit = '인분';
 * item.price = 8000;
 * await item.save();
 * 
 * // 품목 조회
 * const items = await Item.find({ where: { divide: '식사(중식)' } });
 */
@Entity('item')
export class Item extends BaseEntity {
  /**
   * 품목 고유 ID
   * 
   * @description
   * 데이터베이스에서 자동으로 생성되는 UUID입니다.
   * 모든 품목은 이 ID로 고유하게 식별됩니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 품목 번호
   * 
   * @description
   * 품목을 구분하기 위한 비즈니스 번호입니다.
   * 1부터 시작하는 정수이며, 중복되지 않아야 합니다.
   * 
   * @example 1001
   */
  @Column()
  num: number;

  /**
   * 품목명
   * 
   * @description
   * 품목의 이름입니다. 텍스트 타입으로 저장됩니다.
   * 
   * @example "김치찌개"
   */
  @Column('text')
  name: string;

  /**
   * 식사 종류
   * 
   * @description
   * 품목의 식사 종류입니다.
   * 예: '식사(중식)', '식사(양식)', '식사(일식)', '음료', '디저트' 등
   * 
   * @example "식사(중식)"
   */
  @Column('text')
  divide: string;

  /**
   * 회원 등급
   * 
   * @description
   * 품목의 회원 등급입니다.
   * 예: '회원', '준회원', '일반'
   * 
   * @example "회원"
   */
  @Column('text')
  native: string;

  /**
   * 단위
   * 
   * @description
   * 품목의 판매 단위입니다.
   * 예: '인분', '개', '잔', '그릇' 등
   * 
   * @example "인분"
   */
  @Column('text')
  unit: string;

  /**
   * 가격
   * 
   * @description
   * 품목의 판매 가격입니다. 정수 타입으로 저장됩니다.
   * 
   * @example 8000
   */
  @Column()
  price: number;

  /**
   * 생성 시간
   * 
   * @description
   * 품목이 데이터베이스에 처음 저장된 시간입니다.
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
   * 품목 정보가 마지막으로 수정된 시간입니다.
   * TypeORM이 자동으로 업데이트하며, 타임스탬프 타입으로 저장됩니다.
   * 
   * @example "2024-01-15T15:45:00.000Z"
   */
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
} 