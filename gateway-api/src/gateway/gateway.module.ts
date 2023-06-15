import { Module } from '@nestjs/common';
import { GatewayController } from './controllers/gateway.controller';
import { GatewayService } from './services/gateway,service';

@Module({
  imports: [],
  providers: [GatewayService],
  controllers: [GatewayController],
})
export class GatewayModule {}
