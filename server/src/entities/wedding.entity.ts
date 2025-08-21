import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 신랑/부 공통 (husband_, bride_)
 * --------------------- 이하 string
 * name           : 성명
 * image          : 서명(sign)
 * --------------------- 이하 number
 * hall           : 웨딩홀 사용료
 * sword          : 예도물품
 * bouquet        : 부케
 * company        : 웨딩업체
 * owner_woman    : 혼주미용(여)
 * owner_man      : 혼주미용(남)
 * frame          : 액자
 * file           : 원본파일
 * dvd            : DVD
 * etc            : 기타
 * meal           : 식사 인원
 * present        : 답례품 인원
 * reserve        : 예약금
 * pre_deposit    : 선입금
 * ===================================
 * 단독 사항
 * wedding_at     : 웨딩 날짜 (Date)
 * event_at       : 웨딩 시간 (string)
 * --------------------- 이하 string
 * meal_method    : 식사 분할 방법 (privacy, husband, bride, half)
 * present_method : 답례품 분할 방법 (privacy, husband, bride, half)
 * reserve_method : 예약금 분할 방법 (half, husband, bride)
 * --------------------- 이하 number
 * meal_price     : 식사 비용
 * present_price  : 답례품 비용
 * reserve_price  : 예약금
 */

@Entity()
export class Wedding {
  // 공통사항
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'wedding_at', type: 'date' })
  wedding_at: Date;

  @Column({ name: 'event_at, type: text' })
  event_at: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // 신랑 시작
  @Column({ name: 'husband_name', type: 'text' })
  husband_name: string;

  @Column({ name: 'husband_image', type: 'text', nullable: true })
  husband_image: string;

  @Column({ name: 'husband_hall', type: 'int' })
  husband_hall: number;

  @Column({ name: 'husband_sword', type: 'int' })
  husband_sword: number;

  @Column({ name: 'husband_bouquet', type: 'int' })
  husband_bouquet: number;

  @Column({ name: 'husband_company', type: 'int' })
  husband_company: number;

  @Column({ name: 'husband_owner_woman', type: 'int' })
  husband_owner_woman: number;

  @Column({ name: 'husband_owner_man', type: 'int' })
  husband_owner_man: number;

  @Column({ name: 'husband_frame', type: 'int' })
  husband_frame: number;

  @Column({ name: 'husband_file', type: 'int' })
  husband_file: number;

  @Column({ name: 'husband_dvd', type: 'int' })
  husband_dvd: number;

  @Column({ name: 'husband_etc', type: 'int' })
  husband_etc: number;

  @Column({ name: 'husband_meal', type: 'int' })
  husband_meal: number;

  @Column({ name: 'husband_present', type: 'int' })
  husband_present: number;

  @Column({ name: 'husband_reserve', type: 'int' })
  husband_reserve: number;

  @Column({ name: 'husband_pre_deposit', type: 'int' })
  husband_pre_deposit: number;

  // 신부 시작
  @Column({ name: 'bride_name', type: 'text' })
  bride_name: string;

  @Column({ name: 'bride_image', type: 'text', nullable: true })
  bride_image: string;

  @Column({ name: 'bride_hall', type: 'int' })
  bride_hall: number;

  @Column({ name: 'bride_sword', type: 'int' })
  bride_sword: number;

  @Column({ name: 'bride_bouquet', type: 'int' })
  bride_bouquet: number;

  @Column({ name: 'bride_company', type: 'int' })
  bride_company: number;

  @Column({ name: 'bride_owner_woman', type: 'int' })
  bride_owner_woman: number;

  @Column({ name: 'bride_owner_man', type: 'int' })
  bride_owner_man: number;

  @Column({ name: 'bride_frame', type: 'int' })
  bride_frame: number;

  @Column({ name: 'bride_file', type: 'int' })
  bride_file: number;

  @Column({ name: 'bride_dvd', type: 'int' })
  bride_dvd: number;

  @Column({ name: 'bride_etc', type: 'int' })
  bride_etc: number;

  @Column({ name: 'bride_meal', type: 'int' })
  bride_meal: number;

  @Column({ name: 'bride_present', type: 'int' })
  bride_present: number;

  @Column({ name: 'bride_reserve', type: 'int' })
  bride_reserve: number;

  @Column({ name: 'bride_pre_deposit', type: 'int' })
  bride_pre_deposit: number;

  // 단독 사항
  @Column({ name: 'meal_method', type: 'text' })
  meal_method: string;

  @Column({ name: 'present_method', type: 'text' })
  present_method: string;

  @Column({ name: 'reserve_method', type: 'text' })
  reserve_method: string;

  @Column({ name: 'meal_price', type: 'int' })
  meal_price: number;

  @Column({ name: 'present_price', type: 'int' })
  present_price: number;

  @Column({ name: 'reserve_price', type: 'int' })
  reserve_price: number;
}
