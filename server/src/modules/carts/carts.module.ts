import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Item } from "src/entities/item.entity";
import { CartController } from "./carts.controller";
import { CartService } from "./carts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Item])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}