import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

/**
 * 한복(Hanbok) 엔티티
 * 
 * @description
 * 한복 관련 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 
 * @table hanbok - 데이터베이스 테이블명
 */
@Entity('hanbok')
export class Hanbok extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  hanbok_husband: number;

  @Column({ nullable: true })
  hanbok_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 