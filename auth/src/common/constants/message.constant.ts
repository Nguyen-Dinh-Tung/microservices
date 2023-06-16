import { ENTITIES_ENUM } from 'src/core/enum/entities.enum';

export const notFoundMessage = (entity: ENTITIES_ENUM) => {
  return `${entity} not found`;
};
