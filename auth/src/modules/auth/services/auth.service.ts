import { ClientProxy } from '@nestjs/microservices';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { notFoundMessage } from 'src/common/constants/message.constant';
import { ENTITIES_ENUM } from 'src/core/enum/entities.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { FindOneByFieldDto } from 'src/core/dto/find-by-field.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ACOUNT_CLIENT_MICROSERVICE')
    private readonly acountClientProxy: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: LoginDto) {
    const checkAcount: any = await this.validateAcount({
      useranme: data.username,
    });
    if (!checkAcount)
      return {
        status: HttpStatus.NOT_FOUND,
        message: notFoundMessage(ENTITIES_ENUM.ACOUNTS),
      };
    return await this.createToken({ id: checkAcount.id });
  }
  async validateAcount(data: FindOneByFieldDto) {
    return await this.acountClientProxy.send('FIND_ONE_BY_FIELD', data);
  }
  async createToken(data): Promise<string> {
    return this.jwtService.signAsync(data);
  }
}
