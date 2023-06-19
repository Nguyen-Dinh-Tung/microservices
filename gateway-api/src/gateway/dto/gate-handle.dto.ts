import { IsNotEmpty, IsEnum } from 'class-validator';
import { CLIENT_METHOD_MICROSERVICE } from 'src/core/enums/client-method.microservice.enum';
import { SERVICES_ENUM } from 'src/core/enums/services.enum';

export class CreateGateWay {
  @IsNotEmpty()
  @IsEnum(SERVICES_ENUM)
  service: SERVICES_ENUM;
  @IsNotEmpty()
  cmd: string;
  @IsNotEmpty()
  method: CLIENT_METHOD_MICROSERVICE;
}
