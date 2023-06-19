import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WinstonService } from '../winston.service';
import { tap } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private readonly winstonService: WinstonService) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(tap(() => console.log(context.switchToHttp().getResponse())));
  }
}
