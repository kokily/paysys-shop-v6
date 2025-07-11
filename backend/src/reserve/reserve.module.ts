import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '../entities/bill.entity';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';

/**
 * 예약금(Reserve) 모듈
 * 
 * @description
 * 예약금 관련 기능을 제공하는 모듈입니다.
 * - Bill 엔티티를 사용합니다
 * - ReserveService와 ReserveController를 포함합니다
 * - 다른 모듈에서 ReserveService를 사용할 수 있도록 export합니다
 */
@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  providers: [ReserveService],
  controllers: [ReserveController],
  exports: [ReserveService],
})
export class ReserveModule {} 