import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wedding } from 'src/entities/wedding.entity';
import { SignController } from './sign.controller';
import { SignService } from './sign.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wedding])],
  controllers: [SignController],
  providers: [SignService],
})
export class SignModule {}
