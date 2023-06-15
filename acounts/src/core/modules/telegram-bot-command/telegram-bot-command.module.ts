import { Module } from 'nestgram';
import { TelegramBotController } from './controller/telegram-bot.command';
import { TelegramBotCommandService } from './services/telegram-bot-command.service';
import { AppModule } from 'src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcountsEntity } from 'src/acounts/entities/acounts.entity';
import { ConfigService } from '@nestjs/config';
@Module({
  services: [TelegramBotCommandService],
  controllers: [TelegramBotController],
  imports: [],
})
export class TelegramBotCommandModule {}
