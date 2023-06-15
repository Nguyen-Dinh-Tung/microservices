import { ENITIES_ENUM } from 'src/core/enums/entities.enum';

export const messageTaketEntities = (entity: ENITIES_ENUM) => {
  return `Get the list of successfully ${entity}`;
};
export const messageInsertEntities = (entity: ENITIES_ENUM) => {
  return `Insert new ${entity} successfully`;
};
export const messageNotFoundEntities = (entity: ENITIES_ENUM) => {
  return `${entity} not found`;
};
export const messageDeleteEntities = (entity: ENITIES_ENUM) => {
  return `Delete ${entity} successfully`;
};
export const messageDeletedEntities = (entity: ENITIES_ENUM) => {
  return `Deleted ${entity} successfully`;
};
export const messageUpdateEntities = (entity: ENITIES_ENUM) => {
  return `Update ${entity} successfully`;
};
export const messageGetDetailEntities = (entity: ENITIES_ENUM) => {
  return `Get ${entity} successfully`;
};
export const messageTelegramBotCreateNewAcount = (username: string) => {
  return `New user ${username}`;
};
