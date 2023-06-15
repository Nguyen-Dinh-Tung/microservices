import { registerDecorator, ValidationOptions } from 'class-validator';
import sizeOf from 'image-size';
import { SIZE_IMAGE_ERR } from '../errors/errors';
import { TypeErrorImage } from '../enums/type-image-error.enum';
import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
export function ValidateFileSize(
  validateWidth: number,
  validateHeight: number,
  files?: Express.Multer.File,
) {
  const buffer = fs.readFileSync(files[0]);
  const file = sizeOf(buffer);
  const width = file.width;
  const height = file.height;
  if (width !== validateWidth)
    throw new BadRequestException(SIZE_IMAGE_ERR(TypeErrorImage.WIDTH));
  if (height !== validateHeight)
    throw new BadRequestException(SIZE_IMAGE_ERR(TypeErrorImage.HEIGHT));
  return true;
}
