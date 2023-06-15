import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/services/auth.service';
import { messageNotFoundEntities } from 'src/common/contants/message';
import { ENITIES_ENUM } from '../enums/entities.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string) {
    const checkAcount = await this.authService.validateAcount(
      username,
      password,
    );
    if (!checkAcount)
      throw new UnauthorizedException(
        messageNotFoundEntities(ENITIES_ENUM.ACOUNT),
      );

    return checkAcount();
  }
}
