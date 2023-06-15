import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonService } from '../winston/winston.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly winstonService: WinstonService) {}
  use(req: Request, res: Response, next: NextFunction) {
    req.on('close', () => {
      this.winstonService.apiLog(req);
    });
    next();
  }
}
