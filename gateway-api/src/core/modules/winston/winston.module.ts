import { DynamicModule, Module } from '@nestjs/common';
import { WinstonService } from './winston.service';
@Module({})
export class WinstonModule {
  static register(fileName: string): DynamicModule {
    WinstonService.fileName = fileName;
    return {
      module: WinstonModule,
      providers: [WinstonService],
    };
  }
}
