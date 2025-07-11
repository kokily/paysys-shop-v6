import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // API 글로벌 프리픽스 설정
  app.setGlobalPrefix('api');
  
  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Paysys Shop API')
    .setDescription('Paysys Shop 백엔드 API 문서')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // CORS 설정
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log('Swagger 문서: http://localhost:' + (process.env.PORT ?? 3000) + '/api-docs');
}
bootstrap();
