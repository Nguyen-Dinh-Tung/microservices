import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import {
  createTransportWinston,
  transportConsoleConfig,
  // transportConsoleConfig,
  transportHttpConfig,
  transportMaxSize,
  transportsCommon,
} from './winston.tranport';
const logFormatDefault = winston.format.combine(
  winston.format.label({
    label: process.env.APP_NAME || 'APP_NAME',
  }),
  winston.format.timestamp({
    format: transportsCommon.formatDate,
  }),
  winston.format.errors({ stack: true }),
  winston.format.json({
    space: 2,
  }),
);
const levels = { ...winston.config.syslog.levels, request: 0.1 };
const levelsWinston = {
  error: 'error',
  info: 'info',
  debug: 'debug',
  request: 'request',
  warn: 'warn',
};
@Injectable()
export class WinstonService implements LoggerService {
  private winston;
  private contextName;
  public static fileName: string;
  constructor() {
    this.winston = winston.createLogger({
      levels: levels,
      format: logFormatDefault,
      defaultMeta: { service: this.contextName },
      transports: [
        createTransportWinston(levelsWinston.error, WinstonService.fileName),
        transportHttpConfig,
        transportMaxSize,
        transportConsoleConfig,
      ],
    });
    winston.addColors({
      request: winston.config.syslog.colors.info,
    });
  }
  setContextName(contextName) {
    this.contextName = contextName;
  }
  apiLog(input) {
    this.winston.log({
      isApiLog: true,
      level: 'request',
      statusCode: input.statusCode,
      message: input.method,
      originalUrl: input.originalUrl,
      statusMessage: input.statusMessage,
      ip: input.ip,
    });
  }

  error(message: any, key: string) {
    this.winston.log({
      level: 'error',
      message,
      contextName: this.contextName,
      key,
    });
  }

  debug(message: any, key: string) {
    this.winston.log({
      level: 'debug',
      message,
      contextName: this.contextName,
      key,
    });
  }
  warn(message: any, key: string) {
    this.winston.log({
      level: 'warn',
      message,
      contextName: this.contextName,
      key,
    });
  }
  log(message: any, key: string) {
    this.winston.log({
      level: 'info',
      message,
      contextName: this.contextName,
      key,
    });
  }
  info(message: any, key: string) {
    this.winston.log({
      level: 'info',
      message,
      contextName: this.contextName,
      key,
    });
  }
  http(message: any, key: string) {
    this.winston.log({
      level: 'http',
      message,
      contextName: this.contextName,
      key,
    });
  }
  silly(message: any, key: string) {
    this.winston.log({
      level: 'silly',
      message,
      contextName: this.contextName,
      key,
    });
  }
  verbose(message: any, key?: string) {
    this.winston.log({
      level: 'verbose',
      message,
      contextName: this.contextName,
      key,
    });
  }
}
