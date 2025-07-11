import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Wedding } from '../weddings/entities/wedding.entity';
import { Company } from '../weddings/entities/company.entity';
import { Convention } from '../weddings/entities/convention.entity';
import { Event } from '../weddings/entities/event.entity';
import { Hanbok } from '../weddings/entities/hanbok.entity';
import { Meal } from '../weddings/entities/meal.entity';
import { Present } from '../weddings/entities/present.entity';
import { Reserve } from '../weddings/entities/reserve.entity';
import { Prepayment } from '../weddings/entities/prepayment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wedding,
      Company,
      Convention,
      Event,
      Hanbok,
      Meal,
      Present,
      Reserve,
      Prepayment,
    ]),
  ],
  providers: [ExpenseService],
  controllers: [ExpenseController],
  exports: [ExpenseService],
})
export class ExpenseModule {} 