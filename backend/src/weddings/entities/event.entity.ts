import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

/**
 * 이벤트(Event) 엔티티
 * 
 * @description
 * 이벤트 관련 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 
 * @table event - 데이터베이스 테이블명
 */
@Entity('event')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  event_husband: number;

  @Column({ nullable: true })
  event_bride: number;

  @Column({ nullable: true })
  event_etc_husband: number;

  @Column({ nullable: true })
  event_etc_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 