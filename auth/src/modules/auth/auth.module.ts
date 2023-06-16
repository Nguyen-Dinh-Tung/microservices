import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'ACOUNT_CLIENT_MICROSERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('ACOUNT_CLIENT_PORT'),
            host: configService.get<string>('ACOUNT_CLIENT_HOST'),
          },
        }),
    },
  ],
})
export class AuthModule {}
