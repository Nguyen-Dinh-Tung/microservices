import { IsNotEmpty, IsEnum } from 'class-validator';
import { SERVICES_ENUM } from 'src/core/enums/services.enum';

export class CreateGateWay {
  @IsNotEmpty()
  @IsEnum(SERVICES_ENUM)
  service: SERVICES_ENUM;
  @IsNotEmpty()
  body: any;
}
