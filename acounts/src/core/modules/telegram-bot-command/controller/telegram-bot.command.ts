import { Controller, OnCommand } from 'nestgram';
import { TelegramBotCommandService } from '../services/telegram-bot-command.service';
@Controller()
export class TelegramBotController {
  constructor(
    private readonly telegramBotCommandService: TelegramBotCommandService,
  ) {}
  @OnCommand('start')
  start() {
    return this.telegramBotCommandService.start();
  }
  @OnCommand('acounts_today')
  async getAcountToday() {
    return await this.telegramBotCommandService.getAcountToday();
  }
}
