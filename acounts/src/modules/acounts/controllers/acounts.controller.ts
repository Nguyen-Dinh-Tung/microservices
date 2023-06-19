import { Controller } from '@nestjs/common';
import { AcountsServices } from '../services/acounts.service';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERN } from 'src/common/constant/pattern.contants';

@Controller('acounts')
export class AcountsController {
  constructor(private readonly acountsService: AcountsServices) {}
  @MessagePattern({ cmd: MESSAGE_PATTERN.ACOUNTS.FIND_ONE_BY_FIELD })
  async findOneByField(data) {
    return await this.acountsService.findOneByField(data);
  }
}
