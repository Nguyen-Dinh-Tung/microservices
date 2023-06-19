import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule } from '@nestjs/config';
import { MorganModule } from './core/modules/morgan/morgan.module';
import { LogTcpModule } from './core/modules/logs/log-tcp.module';

@Module({
  imports: [ConfigModule.forRoot(), GatewayModule, MorganModule, LogTcpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
