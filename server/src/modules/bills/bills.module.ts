import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bill } from "src/entities/bill.entity";
import { Cart } from "src/entities/cart.entity";
import { NotificationModule } from "../notifications/notification.module";
import { BillsController } from "./bills.controller";
import { BillsService } from "./bills.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill, Cart]),
    NotificationModule,
  ],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}