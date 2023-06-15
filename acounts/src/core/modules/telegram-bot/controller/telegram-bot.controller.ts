import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TelegramBotService } from '../serivces/services/telegram-bot.service';
import { CreateMessageGroup } from '../dto/create-message-group.dto';
import { Response } from 'express';

@Controller('telegram-bot')
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}
  @Post()
  async createMessage(@Body() data: CreateMessageGroup, @Res() res: Response) {
    return await this.telegramBotService.createMessage(data.message, '', res);
  }
}
