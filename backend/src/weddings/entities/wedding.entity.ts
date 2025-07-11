import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';

/**
 * 웨딩(Wedding) 엔티티
 * 
 * @description
 * 웨딩 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 신랑, 신부 정보와 각종 비용 정보를 포함합니다.
 * 
 * @table wedding - 데이터베이스 테이블명
 */
@Entity('wedding')
export class Wedding extends BaseEntity {
  /**
   * 웨딩 고유 ID
   * 
   * @description
   * 데이터베이스에서 자동으로 생성되는 UUID입니다.
   * 모든 웨딩은 이 ID로 고유하게 식별됩니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 신랑 이름
   * 
   * @description
   * 신랑의 이름입니다.
   * 
   * @example "김철수"
   */
  @Column('text')
  husband_name: string;

  /**
   * 신랑 이미지
   * 
   * @description
   * 신랑의 이미지 URL입니다.
   * 
   * @example "https://example.com/husband.jpg"
   */
  @Column({ type: 'text', nullable: true })
  husband_image: string;

  /**
   * 신부 이름
   * 
   * @description
   * 신부의 이름입니다.
   * 
   * @example "이영희"
   */
  @Column('text')
  bride_name: string;

  /**
   * 신부 이미지
   * 
   * @description
   * 신부의 이미지 URL입니다.
   * 
   * @example "https://example.com/bride.jpg"
   */
  @Column({ type: 'text', nullable: true })
  bride_image: string;

  /**
   * 웨딩 날짜
   * 
   * @description
   * 웨딩이 진행되는 날짜입니다.
   * 
   * @example "2024-06-15"
   */
  @Column('text')
  wedding_at: string;

  /**
   * 이벤트 날짜
   * 
   * @description
   * 이벤트가 진행되는 날짜입니다.
   * 
   * @example "2024-06-15"
   */
  @Column('text')
  event_at: string;

  /**
   * 신랑 비용
   * 
   * @description
   * 신랑 측의 총 비용입니다.
   * 
   * @example 5000000
   */
  @Column({ nullable: true })
  cost_husband: number;

  /**
   * 신부 비용
   * 
   * @description
   * 신부 측의 총 비용입니다.
   * 
   * @example 5000000
   */
  @Column({ nullable: true })
  cost_bride: number;

  /**
   * 신랑 식사 비용
   * 
   * @description
   * 신랑 측의 식사 비용입니다.
   * 
   * @example 1000000
   */
  @Column({ nullable: true })
  meal_husband: number;

  /**
   * 신부 식사 비용
   * 
   * @description
   * 신부 측의 식사 비용입니다.
   * 
   * @example 1000000
   */
  @Column({ nullable: true })
  meal_bride: number;

  /**
   * 신랑 선물 비용
   * 
   * @description
   * 신랑 측의 선물 비용입니다.
   * 
   * @example 500000
   */
  @Column({ nullable: true })
  present_husband: number;

  /**
   * 신부 선물 비용
   * 
   * @description
   * 신부 측의 선물 비용입니다.
   * 
   * @example 500000
   */
  @Column({ nullable: true })
  present_bride: number;

  /**
   * 신랑 예약금
   * 
   * @description
   * 신랑 측의 예약금입니다.
   * 
   * @example 1000000
   */
  @Column({ nullable: true })
  reserve_husband: number;

  /**
   * 신부 예약금
   * 
   * @description
   * 신부 측의 예약금입니다.
   * 
   * @example 1000000
   */
  @Column({ nullable: true })
  reserve_bride: number;

  /**
   * 생성 시간
   * 
   * @description
   * 웨딩 정보가 데이터베이스에 처음 저장된 시간입니다.
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
   * 웨딩 정보가 마지막으로 수정된 시간입니다.
   * TypeORM이 자동으로 업데이트하며, 타임스탬프 타입으로 저장됩니다.
   * 
   * @example "2024-01-15T15:45:00.000Z"
   */
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @Column({ nullable: true })
  conventionId: string;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  hanbokId: string;

  @Column({ nullable: true })
  eventId: string;

  @Column({ nullable: true })
  mealId: string;

  @Column({ nullable: true })
  presentId: string;

  @Column({ nullable: true })
  reserveId: string;

  @Column({ nullable: true })
  prepaymentId: string;
} 