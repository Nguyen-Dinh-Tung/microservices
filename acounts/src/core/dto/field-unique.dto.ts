import { IsOptional } from 'class-validator';

export class FieldUnique {
  @IsOptional()
  username?: string;
  @IsOptional()
  phone?: string;
  @IsOptional()
  email?: string;
}
