import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_DATABASE || 'paysys-shop',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
  logging: process.env.DB_LOGGING === 'true' || true,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}; 