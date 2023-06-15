import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from '../services/gateway,service';
import { CreateGateWay } from '../dto/gate-handle.dto';

@Controller('gate')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}
  @Get('check')
  check() {
    return 'helo';
  }
  @Post('handle')
  async connect(@Body() data: CreateGateWay) {
    console.log(data, 'data');
  }
}
