import { Controller } from '@nestjs/common';
import { AcountsServices } from '../services/acounts.service';

@Controller('acounts')
export class AcountsController {
  constructor(private readonly acountsService: AcountsServices) {}
}
