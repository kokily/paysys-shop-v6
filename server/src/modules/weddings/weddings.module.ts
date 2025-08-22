import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wedding } from 'src/entities/wedding.entity';
import { WeddingsController } from './weddings.controller';
import { WeddingsService } from './weddings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wedding])],
  controllers: [WeddingsController],
  providers: [WeddingsService],
  exports: [WeddingsService],
})
export class WeddingsModule {}
