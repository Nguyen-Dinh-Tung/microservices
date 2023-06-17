import { Inject, Injectable } from '@nestjs/common';
import { CreateGateWay } from '../dto/gate-handle.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES_ENUM } from 'src/core/enums/services.enum';
@Injectable()
export class GatewayService {
  constructor(
    @Inject('ACOUNT_CLIENT')
    private readonly acountClient: ClientProxy,
  ) {}
  async connect(data: CreateGateWay) {
    return await this.getClient(data.service)[data.method](
      { cmd: data.cmd },
      data,
    );
  }
  getClient(service: SERVICES_ENUM): ClientProxy {
    const acounts = this.acountClient;
    const clients = {
      acounts: acounts,
    };
    return clients[service];
  }
}
