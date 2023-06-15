import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { SubScriberController } from './controller/subscriber.controller';
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'CLIENT_DANYMA',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: +configService.get('DANYMA_PORT'),
            host: configService.get('DANYMA_HOST'),
          },
        }),
      inject: [ConfigService],
    },
  ],
  controllers: [SubScriberController],
})
export class SubcriberModule {}
