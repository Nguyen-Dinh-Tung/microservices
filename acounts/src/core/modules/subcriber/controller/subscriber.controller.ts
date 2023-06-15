import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from 'src/core/decorator/public.decorator';
@Controller('subscriber')
export class SubScriberController {
  constructor(
    @Inject('CLIENT_DANYMA')
    private readonly danymaClientProxy: ClientProxy,
  ) {}

  @Get()
  @Public()
  async sum() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.danymaClientProxy.send(pattern, payload);
  }
  @Get('events')
  @Public()
  async events() {
    this.danymaClientProxy.emit(
      {
        cmd: 'events',
      },
      {},
    );
    return true;
  }
}
