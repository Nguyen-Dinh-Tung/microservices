import { Module } from '@nestjs/common';
import { AcountsController } from './controllers/acounts.controller';
import { AcountsServices } from './services/acounts.service';

@Module({
  imports: [],
  controllers: [AcountsController],
  providers: [AcountsServices],
})
export class AcountsModule {}
