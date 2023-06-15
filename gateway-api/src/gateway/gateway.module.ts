import { Module } from '@nestjs/common';
import { GatewayController } from './controllers/gateway.controller';
import { GatewayService } from './services/gateway.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    GatewayService,
    {
      provide: 'ACOUNT_CLIENT',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('ACOUNT_CLIENT_PORT'),
            host: configService.get<string>('ACOUNT_CLIENT_HOST'),
          },
        }),
      inject: [ConfigService],
    },
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
