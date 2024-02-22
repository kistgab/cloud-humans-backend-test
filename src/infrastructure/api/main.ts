import { AppModule } from '@/infrastructure/api/app.module';
import { configSwagger } from '@/infrastructure/api/config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  configSwagger(app);

  await app.listen(3000);
}
bootstrap();
