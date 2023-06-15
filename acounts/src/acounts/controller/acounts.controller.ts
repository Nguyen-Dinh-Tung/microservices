import { ENITIES_ENUM } from './../../core/enums/entities.enum';
import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Query,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AcountsService } from '../services/acounts.service';
import { Response } from 'express';
import { AppRes } from 'src/core/res/res';
import { QueryDtoBase } from 'src/core/query/query.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateAcountDto } from '../dto/create-acount.dto';
import { Acount } from 'src/core/decorator/user.decorator';
import * as _ from 'lodash';
import { AcountsEntity } from '../entities/acounts.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DeleteParamDto } from '../../core/dto/delete-param.dto';
import { UpdateAcountDto } from '../dto/update-acount.dto';
@ApiTags('acounts')
@ApiBearerAuth()
@Controller('acounts')
export class AcountsController {
  constructor(private readonly acountsService: AcountsService) {}
  @ApiOperation({ summary: 'Get list acounts' })
  @Get()
  async findAll(@Res() res: Response, @Query() queryDto: QueryDtoBase) {
    try {
      return await this.acountsService.findALl(res, queryDto);
    } catch (e) {
      if (e) {
        AppRes(e.message, HttpStatus.INTERNAL_SERVER_ERROR, res);
      }
    }
  }
  @ApiOperation({ summary: 'Get list acounts' })
  @Get(':id')
  async findOne(@Res() res: Response, @Param() param: DeleteParamDto) {
    try {
      return await this.acountsService.findOne(param, res);
    } catch (e) {
      if (e) {
        AppRes(e.message, HttpStatus.INTERNAL_SERVER_ERROR, res);
      }
    }
  }
  @ApiOperation({ summary: 'Create new Acount' })
  @ApiConsumes('multipart/form-data')
  // @AppRoles({
  //   entity: ENITIES_ENUM.ACOUNT,
  //   action: ACTION_ENUM.CREATE,
  // })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avt', maxCount: 1 },
      { name: 'bg', maxCount: 1 },
    ]),
  )
  async createAcount(
    @Res() res: Response,
    @Body() data: CreateAcountDto,
    @Acount() acount?: AcountsEntity,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    return await this.acountsService.createAcount(res, data, acount, files);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete acount' })
  async delete(@Param() param: DeleteParamDto, @Res() res: Response) {
    return await this.acountsService.delete(param, res);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update acount' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avt', maxCount: 1 },
      { name: 'bg', maxCount: 1 },
    ]),
  )
  async update(
    @Param() param: DeleteParamDto,
    @Body() data: UpdateAcountDto,
    @Res() res: Response,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    return await this.acountsService.update(param, data, res, files);
  }
}
