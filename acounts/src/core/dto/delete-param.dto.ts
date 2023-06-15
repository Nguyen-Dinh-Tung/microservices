import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class DeleteParamDto {
  @IsUUID()
  id: UUID;
}
