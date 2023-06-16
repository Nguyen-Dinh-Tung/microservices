import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';
import { NestGram } from 'nestgram';
import { TelegramBotModule } from './core/modules/telegram-bot/telegram-bot.module';
import { TelegramBotCommandModule } from './core/modules/telegram-bot-command/telegram-bot-command.module';
import { FilterErrorException } from './core/filter-exception/fillter-exception.error';
import { TelegramBotService } from './core/modules/telegram-bot/serivces/services/telegram-bot.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {});

  app.init();
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Landing page')
    .setDescription('The landing page api')
    .setVersion('1.0')
    .build();
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalFilters(new FilterErrorException(app.get(TelegramBotService)));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: +configService.get<number>('SERVER_PORT'),
      host: configService.get<string>('SERVER_HOST'),
    },
  });
  app.startAllMicroservices();
  SwaggerModule.setup('open', app, document);
}
bootstrap();
async function botBootstrap() {
  const bot = new NestGram(
    process.env.TELEGRAM_BOT_KEY,
    TelegramBotCommandModule,
  );
  bot.start();
}

botBootstrap();
