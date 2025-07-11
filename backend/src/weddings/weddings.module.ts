import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wedding } from './entities/wedding.entity';
import { Company } from './entities/company.entity';
import { Convention } from './entities/convention.entity';
import { Event } from './entities/event.entity';
import { Hanbok } from './entities/hanbok.entity';
import { Meal } from './entities/meal.entity';
import { Present } from './entities/present.entity';
import { Reserve } from './entities/reserve.entity';
import { Prepayment } from './entities/prepayment.entity';
import { WeddingsService } from './weddings.service';
import { WeddingsController } from './weddings.controller';

/**
 * 웨딩(Wedding) 모듈
 * 
 * @description
 * 웨딩 관련 기능을 제공하는 모듈입니다.
 * - 모든 웨딩 관련 엔티티들을 사용합니다
 * - WeddingsService와 WeddingsController를 포함합니다
 * - 다른 모듈에서 WeddingsService를 사용할 수 있도록 export합니다
 */
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
  providers: [WeddingsService],
  controllers: [WeddingsController],
  exports: [WeddingsService],
})
export class WeddingsModule {} 