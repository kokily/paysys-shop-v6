import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';
import { Wedding } from '../weddings/entities/wedding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wedding])],
  providers: [SignService],
  controllers: [SignController],
  exports: [SignService],
})
export class SignModule {} 