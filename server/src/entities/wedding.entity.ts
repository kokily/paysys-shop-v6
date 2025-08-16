import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('weddings')
export class Wedding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 신랑 신부 공통   
   * hall -> 웨딩홀 사용료
   * sword -> 예도물품
   * bouquet -> 부케
   * company -> 웨딩업체
   * owner_woman -> 혼주미용(여)
   * owner_man -> 혼주미용(남)
   * frame -> 액자
   * file -> 원본파일
   * dvd -> DVD
   * etc -> 기타
   * meal -> 식사비용
   * present -> 답례품비용
   * reserve -> 예약금
   * pre_deposit -> 선 입금
   */
  // 신랑
  @Column({ name: 'husband_name', type: 'text' })
  husband_name: string;

  @Column({ name: 'husband_image', type: 'text', nullable: true })
  husband_image: string;

  @Column({ name: 'husband_meal', type: 'int' })
  husband_meal: number;

  @Column({ name: 'husband_present', type: 'int' })
  husband_present: number;

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

  // 신부
  @Column({ name: 'bride_name', type: 'text' })
  bride_name: string;

  @Column({ name: 'bride_image', type: 'text', nullable: true })
  bride_image: string;

  @Column({ name: 'bride_meal', type: 'int' })
  bride_meal: number;

  @Column({ name: 'bride_present', type: 'int' })
  bride_present: number;

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

  // 날짜, 시간
  @Column({ name: 'wedding_at', type: 'date' })
  wedding_at: Date;

  @Column({ name: 'event_at', type: 'text' })
  event_at: string;

  // 분할 방법 및 단가
  @Column({ name: 'meal_method', type: 'text' })
  meal_method: string;

  @Column({ name: 'meal_price', type: 'int' })
  meal_price: number;

  @Column({ name: 'present_method', type: 'text' })
  present_method: string;

  @Column({ name: 'present_price', type: 'int' })
  present_price: number;

  @Column({ name: 'reserve_method', type: 'text' })
  reserve_method: string;

  @Column({ name: 'reserve_price', type: 'int' })
  reserve_price: number;

  // 선 입금
  @Column({ name: 'husband_pre_deposit', type: 'int' })
  husband_pre_deposit: number;

  @Column({ name: 'bride_pre_deposit', type: 'int' })
  bride_pre_deposit: number;

  // 공통사항
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}