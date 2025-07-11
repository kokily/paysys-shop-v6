import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

/**
 * 식사(Meal) 엔티티
 * 
 * @description
 * 식사 관련 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 
 * @table meal - 데이터베이스 테이블명
 */
@Entity('meal')
export class Meal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  meal_husband: number;

  @Column({ nullable: true })
  meal_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 