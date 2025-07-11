import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

/**
 * 선지급금(Prepayment) 엔티티
 * 
 * @description
 * 선지급금 관련 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 
 * @table prepayment - 데이터베이스 테이블명
 */
@Entity('prepayment')
export class Prepayment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  prepayment_husband: number;

  @Column({ nullable: true })
  prepayment_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 