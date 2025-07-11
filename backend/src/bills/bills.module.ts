import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '../entities/bill.entity';
import { Cart } from '../entities/cart.entity';
import { BillService } from './bills.service';
import { BillController } from './bills.controller';

/**
 * 청구서(Bill) 모듈
 * 
 * @description
 * 청구서 관련 기능을 제공하는 모듈입니다.
 * - Bill 엔티티와 Cart 엔티티를 사용합니다
 * - BillService와 BillController를 포함합니다
 * - 다른 모듈에서 BillService를 사용할 수 있도록 export합니다
 */
@Module({
  imports: [TypeOrmModule.forFeature([Bill, Cart])],
  providers: [BillService],
  controllers: [BillController],
  exports: [BillService],
})
export class BillModule {} 