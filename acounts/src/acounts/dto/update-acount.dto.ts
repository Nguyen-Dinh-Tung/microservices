import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { CreateAcountDto } from './create-acount.dto';
import { IsOptional } from 'class-validator';
import { CountryCodesEnum } from 'src/core/enums/country-codes.enum';

export class UpdateAcountDto extends PickType(CreateAcountDto, [
  'fullname',
  'phone',
  'facebook',
  'google',
  'address',
  'avatar',
  'background',
  'email',
  'country',
  'password',
]) {
  @IsOptional()
  @ApiPropertyOptional()
  fullname: string;
  @IsOptional()
  @ApiPropertyOptional()
  phone: string;
  @IsOptional()
  @ApiPropertyOptional()
  address: string;
  @IsOptional()
  @ApiPropertyOptional()
  background: string;
  @IsOptional()
  @ApiPropertyOptional()
  avatar: string;
  @IsOptional()
  @ApiPropertyOptional()
  password: string;
  @IsOptional()
  @ApiPropertyOptional()
  google: string;
  @IsOptional()
  @ApiPropertyOptional()
  facebook: string;
  @IsOptional()
  @ApiPropertyOptional()
  email: string;
  @IsOptional()
  @ApiPropertyOptional()
  country: CountryCodesEnum;
  @ApiPropertyOptional({ format: 'binary', type: String })
  bg: Express.Multer.File;
  @ApiPropertyOptional({ format: 'binary', type: String })
  avt: Express.Multer.File;
}
