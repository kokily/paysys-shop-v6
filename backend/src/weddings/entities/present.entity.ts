import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

/**
 * 선물(Present) 엔티티
 * 
 * @description
 * 선물 관련 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 
 * @table present - 데이터베이스 테이블명
 */
@Entity('present')
export class Present extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  present_husband: number;

  @Column({ nullable: true })
  present_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 