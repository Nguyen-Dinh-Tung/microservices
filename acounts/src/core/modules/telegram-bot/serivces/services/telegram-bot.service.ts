import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { TelegramService } from 'nestjs-telegram';
@Injectable()
export class TelegramBotService {
  constructor(private readonly telegramService: TelegramService) {}
  async createMessage(message: string, chat_id?: string, res?: Response) {
    await this.telegramService
      .sendMessage({
        chat_id: chat_id ? chat_id : process.env.TELEGRAM_KEYGROUP_TEST,
        text: message,
      })
      .toPromise();
  }

  async joinGroup() {}
}
