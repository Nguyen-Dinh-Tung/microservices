import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { DatabaseModule } from './core/databases/database.module';
import { AcountsModule } from './modules/acounts/acounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      expandVariables: true,
    }),
    MulterModule.register({
      dest: '/data/images',
    }),
    DatabaseModule,
    AcountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
