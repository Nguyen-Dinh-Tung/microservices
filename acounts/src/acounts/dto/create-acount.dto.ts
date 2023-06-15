import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CountryCodesEnum } from 'src/core/enums/country-codes.enum';
export class CreateAcountDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nguyen van a' })
  @IsString()
  fullname: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ApiProperty({ example: '0098989898' })
  phone: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'Tungphich@12' })
  password: string;
  @IsNotEmpty()
  @IsEnum(CountryCodesEnum)
  @ApiProperty({})
  country: CountryCodesEnum;
  @ApiPropertyOptional({ description: 'facebook name' })
  @IsOptional()
  facebook: string;
  @ApiPropertyOptional({ description: 'Google id' })
  @IsOptional()
  google: string;
  @IsNotEmpty()
  @ApiProperty({ example: 'test0001' })
  // @Matches(usernameRegex, { message: 'Username is not format' })
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  address: string;
  @ApiProperty({ format: 'binary', type: String })
  bg: Express.Multer.File;
  @ApiProperty({ format: 'binary', type: String })
  avt: Express.Multer.File;
  avatar: string;
  background: string;
}
