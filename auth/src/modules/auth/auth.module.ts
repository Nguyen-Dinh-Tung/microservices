import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LogTcpModule } from 'src/core/modules/logs/log-tcp.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
      imports: [ConfigModule.forRoot()],
    }),
    LogTcpModule,
  ],
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
