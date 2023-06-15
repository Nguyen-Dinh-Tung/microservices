import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageGroup {
  @IsNotEmpty()
  @IsString()
  message: string;
}
