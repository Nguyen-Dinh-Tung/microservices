import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { GatewayService } from '../services/gateway.service';
import { CreateGateWay } from '../dto/gate-handle.dto';
import { Response } from 'express';

@Controller('gate')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}
  @Get('check')
  check() {
    return 'helo';
  }
  @Post('handle')
  async connect(@Body() data: CreateGateWay, @Res() res: Response) {
    return await this.gatewayService.connect(data, res);
  }
}
