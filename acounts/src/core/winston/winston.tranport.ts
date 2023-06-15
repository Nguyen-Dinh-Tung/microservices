import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
const GM7_DEFAULT_TIME_ZONE = 'Asia/Ho_Chi_Minh';
import * as moment from 'moment-timezone';

export const transportsCommon = {
  formatDate: moment().tz(GM7_DEFAULT_TIME_ZONE).format('DD-MM-YYYY hh:mm:ss'),
};
export const logFormatConsole = winston.format.combine(
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
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    if (info?.isApiLog) {
      return `[${info.message}] ${info.originalUrl} | ${info.statusCode} | ${info.timestamp} | ${info.ip} - ${info.statusMessage}`;
    }
    return `[${info.level}] - ${info.timestamp} | ${JSON.stringify(info)}`;
  }),
);
export const createTransportWinston = (level: string, fileName: string) => {
  return new DailyRotateFile({
    level: level,
    filename: `logs/%DATE%/${fileName}.${level}.log`,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '30d',
    maxSize: '5m',
  });
};
export const transportHttpConfig = new winston.transports.Http({
  level: 'http',
  host: 'locahost',
  port: 4000,
  silent: true,
  path: 'app-log',
});
export const transportMaxSize = new winston.transports.File({
  silent: false,
  filename: 'logs/logs_size/logs.log',
});
export const transportConsoleConfig = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.cli(),
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.key}: ${info.message}`;
    }),
  ),
});
