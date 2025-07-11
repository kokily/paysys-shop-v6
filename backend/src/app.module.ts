import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './items/items.module';
import { CartModule } from './carts/carts.module';
import { BillModule } from './bills/bills.module';
import { ReserveModule } from './reserve/reserve.module';
import { WeddingsModule } from './weddings/weddings.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('app.database.host'),
        port: configService.get('app.database.port'),
        username: configService.get('app.database.username'),
        password: configService.get('app.database.password'),
        database: configService.get('app.database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('app.database.synchronize'),
        logging: configService.get('app.database.logging'),
        ssl: configService.get('app.nodeEnv') === 'production' ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ItemModule,
    CartModule,
    BillModule,
    ReserveModule,
    WeddingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
