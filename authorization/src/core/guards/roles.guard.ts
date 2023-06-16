import { Public } from './../decorator/public.decorator';
import { RolesInterface } from './../interfaces/roles.interface';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ACTION_ENUM } from '../enums/role.enum';
import { AcountsEntity } from 'src/acounts/entities/acounts.entity';
import { DataSource, Repository } from 'typeorm';
import { ENITIES_ENUM } from '../enums/entities.enum';
import { RolesEntity } from '../entities/role.entity';

@Injectable()
class RolesGuard implements CanActivate {
  private roleEntity: Repository<RolesEntity>;
  constructor(
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {
    this.roleEntity = this.dataSource.getRepository(RolesEntity);
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RolesInterface>('roles', ctx.getHandler());
    const req = ctx.switchToHttp().getRequest();
    const acount = req['user'];
    if (acount['isAdmin']) return true;
    if (roles.entity === ENITIES_ENUM.PUBLIC) return true;
    const checkRole = await this.roleEntity.findOne({
      where: {
        acount: acount,
        entity: roles.entity,
        action: roles.action,
      },
    });
    if (roles.action === ACTION_ENUM.PUBLIC) return true;
    if (!checkRole || checkRole.isActive === false) return false;
    return true;
  }
}

export const AppRoles = (roles: RolesInterface) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
