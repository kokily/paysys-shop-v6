import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

/**
 * 예약금(Reserve) 엔티티
 * 
 * @description
 * 예약금 관련 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 
 * @table reserve - 데이터베이스 테이블명
 */
@Entity('reserve')
export class Reserve extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  reserve_husband: number;

  @Column({ nullable: true })
  reserve_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 