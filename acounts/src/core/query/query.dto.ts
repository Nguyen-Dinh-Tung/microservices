import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QUERY_TAKE_ENUM } from '../enums/query-take.enum';
import { CountryCodesEnum } from '../enums/country-codes.enum';
import { Transform } from 'class-transformer';
import { stringToBoolean } from 'src/common/funcs/stringToBoolean';
import { transformKeysearch } from 'src/common/funcs/transform-keysearch';

export class QueryDtoBase {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Number take',
    enum: QUERY_TAKE_ENUM,
    default: QUERY_TAKE_ENUM.FISRT,
  })
  take: QUERY_TAKE_ENUM = 10;
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number page', default: 1 })
  page: number = 1;
  @IsOptional()
  @ApiPropertyOptional({ description: 'Status entity', default: true })
  @Transform((data) => stringToBoolean(data.value))
  isActive: boolean;
  @IsOptional()
  @IsEnum(CountryCodesEnum)
  @ApiPropertyOptional({
    enum: CountryCodesEnum,
    description: 'This is country entity ',
    default: CountryCodesEnum.Vietnam,
  })
  country: CountryCodesEnum = CountryCodesEnum.Vietnam;
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Keyworkd search' })
  @Transform((data) => transformKeysearch(data.value))
  keySearch: string;
  skip: number;
  constructor() {
    this.skip = (this.page - 1) * this.take;
  }
}
