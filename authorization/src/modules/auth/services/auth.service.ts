import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AcountsService } from 'src/acounts/services/acounts.service';
import * as bcrypt from 'bcrypt';
import { AcountsEntity } from 'src/acounts/entities/acounts.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly acountsService: AcountsService,
    private readonly jwtService: JwtService,
  ) {}
  async validateAcount(username: string, password: string) {
    const checkAcount = await this.acountsService.findOneByField({
      username: username,
    });
    return checkAcount && bcrypt.compareSync(password, checkAcount.password)
      ? () => {
          delete checkAcount.password;
          return checkAcount;
        }
      : null;
  }
  async login(acount: AcountsEntity) {
    return {
      access_token: this.jwtService.sign({
        id: acount.id,
        username: acount.username,
      }),
    };
  }
}
