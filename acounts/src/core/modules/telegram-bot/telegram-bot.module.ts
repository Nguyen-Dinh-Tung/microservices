import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramModule, TelegramService } from 'nestjs-telegram';
import { TelegramBotController } from './controller/telegram-bot.controller';
import { TelegramBotService } from './serivces/services/telegram-bot.service';

@Module({
  imports: [
    TelegramModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return { botKey: configService.get<string>('TELEGRAM_BOT_KEY') };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [TelegramBotController],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
