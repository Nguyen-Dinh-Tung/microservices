import { ENITIES_ENUM } from '../enums/entities.enum';
import { ACTION_ENUM } from '../enums/role.enum';

export interface RolesInterface {
  action: ACTION_ENUM;
  entity: ENITIES_ENUM;
}
