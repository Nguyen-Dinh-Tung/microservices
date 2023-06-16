import { Module } from '@nestjs/common';
import { AcountsController } from './controllers/acounts.controller';
import { AcountsServices } from './services/acounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcountsEntity } from './entity/acounts.entiti';

@Module({
  imports: [TypeOrmModule.forFeature([AcountsEntity])],
  controllers: [AcountsController],
  providers: [AcountsServices],
})
export class AcountsModule {}
