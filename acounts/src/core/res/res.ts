import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const AppRes = (
  message: string,
  status: HttpStatus,
  res: Response,
  data?: any,
) => {
  return res.status(status).json({
    message: message,
    data: data ? data : '',
  });
};
