import { Inject, Injectable } from '@nestjs/common';
import { CreateGateWay } from '../dto/gate-handle.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES_ENUM } from 'src/core/enums/services.enum';
import { CLIENT_METHOD_MICROSERVICE } from 'src/core/enums/client-method.microservice.enum';
@Injectable()
export class GatewayService {
  constructor(
    @Inject('ACOUNT_CLIENT')
    private readonly acountClient: ClientProxy,
  ) {}
  async connect(data: CreateGateWay) {
    console.log(this.acountClient, 'acount');

    return data.method === CLIENT_METHOD_MICROSERVICE.EMIT
      ? async () => {
          await this.getClient(data.service)[data.method](
            { cmd: data.cmd },
            data,
          );
          return true;
        }
      : await this.getClient(data.service)[data.method](
          { cmd: data.cmd },
          data,
        );
  }
  getClient(service: SERVICES_ENUM): ClientProxy {
    const acounts = this.acountClient;
    const clients = {
      acounts: acounts,
    };
    console.log(clients[service], 'clients[service]');

    return clients[service];
  }
}
