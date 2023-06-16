import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/core/guards/local.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorator/public.decorator';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
