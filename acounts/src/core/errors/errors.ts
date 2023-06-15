import { TypeErrorImage } from '../enums/type-image-error.enum';

type AppError = {
  status: number;
  message: string;
};
export const NOT_FOUND_ERR = (entity: string) => {
  return {
    message: `${entity} not found`,
    status: 4000,
  };
};
export const EXIST_ERR = (entity: string) => {
  return {
    message: `${entity} existed`,
    status: 4001,
  };
};
export const SIZE_IMAGE_ERR = (type: TypeErrorImage) => {
  return {
    message: `${type} error`,
    status: 4002,
  };
};
