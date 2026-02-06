import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entity';
import { Cart } from 'src/entities/cart.entity';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { User } from 'src/entities/user.entity';
import { NotificationModule } from 'src/modules/notifications/notification.module'

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Cart, User]), NotificationModule],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
