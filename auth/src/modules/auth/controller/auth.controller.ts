import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @MessagePattern({ cmd: 'login' })
  async login(data: LoginDto) {
    return this.authService.login(data);
  }
}
