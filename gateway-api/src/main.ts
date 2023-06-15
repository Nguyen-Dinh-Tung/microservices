import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(configService.get<number>('MAIN_PORT'));
  console.log(
    `Gateway service port :${configService.get<number>('MAIN_PORT')}`,
  );
}
bootstrap();
