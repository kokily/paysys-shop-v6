import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

/**
 * 컨벤션(Convention) 엔티티
 * 
 * @description
 * 컨벤션 예식비용 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 웨딩홀 사용료, 예도칼, 장갑, 부케, 폐백음식 등의 비용을 포함합니다.
 * 
 * @table convention - 데이터베이스 테이블명
 */
@Entity('convention')
export class Convention extends BaseEntity {
  /**
   * 컨벤션 고유 ID
   * 
   * @description
   * 데이터베이스에서 자동으로 생성되는 UUID입니다.
   * 모든 컨벤션은 이 ID로 고유하게 식별됩니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 웨딩홀 사용료
  @Column({ nullable: true })
  rental_husband: number;

  @Column({ nullable: true })
  rental_bride: number;

  // 예도칼 사용료
  @Column({ nullable: true })
  sword_husband: number;

  @Column({ nullable: true })
  sword_bride: number;

  // 장갑 사용료
  @Column({ nullable: true })
  glove_husband: number;

  @Column({ nullable: true })
  glove_bride: number;

  // 부케
  @Column({ nullable: true })
  bouquet_husband: number;

  @Column({ nullable: true })
  bouquet_bride: number;

  // 폐백음식
  @Column({ nullable: true })
  ceremony_husband: number;

  @Column({ nullable: true })
  ceremony_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 