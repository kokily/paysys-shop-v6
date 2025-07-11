import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';

/**
 * 웨딩업체(Company) 엔티티
 * 
 * @description
 * 웨딩업체 관련 정보를 저장하는 데이터베이스 테이블과 매핑되는 엔티티입니다.
 * 각종 웨딩 서비스 비용 정보를 포함합니다.
 * 
 * @table company - 데이터베이스 테이블명
 */
@Entity('company')
export class Company extends BaseEntity {
  /**
   * 업체 고유 ID
   * 
   * @description
   * 데이터베이스에서 자동으로 생성되는 UUID입니다.
   * 모든 업체는 이 ID로 고유하게 식별됩니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 웨딩업체
  @Column({ nullable: true })
  company_husband: number;

  @Column({ nullable: true })
  company_bride: number;

  // 야간 옥상전구
  @Column({ nullable: true })
  rooftop_husband: number;

  @Column({ nullable: true })
  rooftop_bride: number;

  // 혼주메이크업 (여)
  @Column({ nullable: true })
  owner_woman_husband: number;

  @Column({ nullable: true })
  owner_woman_bride: number;

  // 혼주메이크업 (남)
  @Column({ nullable: true })
  owner_man_husband: number;

  @Column({ nullable: true })
  owner_man_bride: number;

  // 셀렉
  @Column({ nullable: true })
  select_husband: number;

  @Column({ nullable: true })
  select_bride: number;

  // 액자
  @Column({ nullable: true })
  frame_husband: number;

  @Column({ nullable: true })
  frame_bride: number;

  // 드레스
  @Column({ nullable: true })
  dress_husband: number;

  @Column({ nullable: true })
  dress_bride: number;

  // 헤어피스
  @Column({ nullable: true })
  hairpin_husband: number;

  @Column({ nullable: true })
  hairpin_bride: number;

  // 가발
  @Column({ nullable: true })
  wig_husband: number;

  @Column({ nullable: true })
  wig_bride: number;

  // 비디오 촬영
  @Column({ nullable: true })
  video_husband: number;

  @Column({ nullable: true })
  video_bride: number;

  // 기타사항
  @Column({ nullable: true })
  etc_husband: number;

  @Column({ nullable: true })
  etc_bride: number;

  // Relations
  @Column({ nullable: true })
  weddingId: string;
} 