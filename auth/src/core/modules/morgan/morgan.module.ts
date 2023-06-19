import { MorganInterceptor, MorganModule as Morgan } from 'nest-morgan';
import { Module, OnModuleInit } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as chalk from 'chalk';
import * as morganCore from 'morgan';
function statusCombinedColr(status: number) {
  const color = {
    200: `${chalk.green(status)}`,
    201: `${chalk.green(status)}`,
    400: `${chalk.red(status)}`,
    401: `${chalk.red(status)}`,
    404: `${chalk.red(status)}`,
    405: `${chalk.red(status)}`,
    500: `${chalk.red(status)}`,
  };
  return color[status] ? color[status] : `${chalk.yellow(status)}`;
}
@Module({
  imports: [Morgan],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor(
        `${chalk.green(
          '[:method]',
        )} :remote-addr  :remote-user [:date[clf]] ":url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ${chalk.yellow(
          '[data::body]',
        )} :response-time ms)`,
      ),
    },
  ],
})
export class MorganModule implements OnModuleInit {
  onModuleInit() {
    morganCore.token('body', function (reqs) {
      if (!reqs['originalUrl'].includes('/sign-in')) {
        return JSON.stringify(reqs['body']);
      }
      return '{}';
    });
    morganCore.token('statusCode', (req, res) => {
      return statusCombinedColr(res.statusCode);
    });
  }
}
