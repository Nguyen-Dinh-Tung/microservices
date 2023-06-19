import { MessagePattern } from '@nestjs/microservices';
import { Controller, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { MESSAGE_PATTERN } from 'src/common/constants/pattern.contants';
import { LogPatternTcpInterceptor } from 'src/core/modules/logs/log-tcp.interceptor.';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @MessagePattern({ cmd: MESSAGE_PATTERN.AUTH.LOGIN.VALUE })
  async login(data: LoginDto) {
    return await this.authService.login(data);
  }
  @MessagePattern({ cmd: MESSAGE_PATTERN.AUTH.AUTHORIZATION.VALUE })
  async authorization() {}
}
