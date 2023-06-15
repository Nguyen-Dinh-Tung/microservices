import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { TelegramBotService } from '../modules/telegram-bot/serivces/services/telegram-bot.service';
import { Response } from 'express';
@Catch(HttpException)
export class FilterErrorException implements ExceptionFilter {
  constructor(private readonly telegramBotService: TelegramBotService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    if (![200, 201].includes(status))
      this.telegramBotService.createMessage(
        `[${request.method}] - author : ${
          request.user ? request.user.username : ''
        } New error status : ${status} , message : ${exception.message} , ip: ${
          request.ip
        }`,
        process.env.TELEGRAM_KEYGROUP_ERROR,
      );
    console.log(request.user, 'user');

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
