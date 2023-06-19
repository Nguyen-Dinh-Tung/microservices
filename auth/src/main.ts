import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: configService.get<number>('MAIN_PORT'),
      host: configService.get<string>('MAIN_HOST'),
    },
  });
  await app.startAllMicroservices();
  console.log(`Auth service port :${configService.get<number>('MAIN_PORT')}`);
}
bootstrap();
