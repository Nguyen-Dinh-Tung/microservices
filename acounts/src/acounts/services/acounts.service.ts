import {
  Injectable,
  HttpStatus,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryDtoBase } from 'src/core/query/query.dto';
import { DataSource, Repository } from 'typeorm';
import { AcountsEntity } from '../entities/acounts.entity';
import { Meta } from 'src/core/query/meta.dto';
import { AppRes } from 'src/core/res/res';
import {
  messageDeleteEntities,
  messageGetDetailEntities,
  messageInsertEntities,
  messageNotFoundEntities,
  messageTaketEntities,
  messageTelegramBotCreateNewAcount,
  messageUpdateEntities,
} from 'src/common/contants/message';
import { CreateAcountDto } from '../dto/create-acount.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EXIST_ERR } from 'src/core/errors/errors';
import { transformImage } from 'src/core/transform/transform-image';
import { ENITIES_ENUM } from 'src/core/enums/entities.enum';
import { DeleteParamDto } from '../../core/dto/delete-param.dto';
import * as fs from 'fs';
import { UpdateAcountDto } from '../dto/update-acount.dto';
import { FieldUnique } from 'src/core/dto/field-unique.dto';
import { TelegramBotService } from 'src/core/modules/telegram-bot/serivces/services/telegram-bot.service';

@Injectable()
export class AcountsService {
  private readonly acountRepo: Repository<AcountsEntity>;
  constructor(
    private readonly dataSource: DataSource,
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly telegramBotService: TelegramBotService,
  ) {
    this.acountRepo = this.dataSource.getRepository(AcountsEntity);
  }

  async findALl(res: Response, queryDto: QueryDtoBase) {
    // const cache = await this.cacheManager.get(process.env.CACHE_USERS_KEY);
    // if (!cache) {
    // await this.cacheManager.del(process.env.CACHE);
    const querySyntax = this.acountRepo
      .createQueryBuilder('acounts')
      .where('acounts.isDelete =:isDelete', { isDelete: false })
      .take(queryDto.take)
      .skip(queryDto.skip);
    if (queryDto.keySearch) {
      querySyntax.andWhere('acounts.fullname like :keySearch');
      querySyntax.andWhere('acounts.email like :keySearch', {
        keySearch: queryDto.keySearch,
      });
      querySyntax.andWhere('acounts.phone like :keySearch', {
        keySearch: queryDto.keySearch,
      });
      querySyntax.andWhere('acounts.username like :keySearch', {
        keySearch: queryDto.keySearch,
      });
    }
    if (queryDto.isActive !== undefined)
      querySyntax.andWhere('acounts.isActive =:isActive', {
        isActive: queryDto.isActive,
      });
    const [data, total] = await querySyntax.getManyAndCount();
    const meta = new Meta({
      page: queryDto.page,
      take: queryDto.take,
      total: total,
    });
    const lastData = { docs: data, meta };
    AppRes(
      messageTaketEntities(ENITIES_ENUM.ACOUNT),
      HttpStatus.OK,
      res,
      lastData,
    );
    // return await this.cacheManager.set(
    //   process.env.CACHE_USERS_KEY,
    //   JSON.stringify(lastData),
    //   1000,
    // );
    // }
    AppRes(
      messageTaketEntities(ENITIES_ENUM.ACOUNT),
      HttpStatus.OK,
      res,
      // JSON.parse(await this.cacheManager.get(process.env.CACHE_MANAGER)),
    );
  }
  async createAcount(
    res: Response,
    data: CreateAcountDto,
    acount?: AcountsEntity,
    files?: Array<Express.Multer.File>,
  ) {
    const checkAcount = await this.acountRepo.findOne({
      where: [
        { username: data.username },
        { email: data.email },
        { phone: data.phone },
      ],
    });
    if (checkAcount) {
      files && files['bg'] ? fs.unlinkSync(files['bg'][0].path) : '';
      files && files['avt'] ? fs.unlinkSync(files['avt'][0].path) : '';
      throw new BadRequestException(EXIST_ERR(ENITIES_ENUM.ACOUNT));
    }
    data.background = transformImage(files['bg']);
    data.avatar = transformImage(files['avt']);
    delete data.bg;
    delete data.avt;
    const newAcount = this.acountRepo.create(data);
    newAcount.create_by = acount;
    newAcount.create_at = new Date();
    if (newAcount) await this.acountRepo.insert(newAcount);
    AppRes(
      messageInsertEntities(ENITIES_ENUM.ACOUNT),
      HttpStatus.CREATED,
      res,
      newAcount,
    );
    return this.telegramBotService.createMessage(
      messageTelegramBotCreateNewAcount(newAcount.username),
    );
  }
  async delete(param: DeleteParamDto, res: Response) {
    const checkAcount = await this.acountRepo.findOne({
      where: {
        id: param.id,
        isDelete: false,
      },
    });
    if (!checkAcount)
      return AppRes(
        messageNotFoundEntities(ENITIES_ENUM.ACOUNT),
        HttpStatus.NOT_FOUND,
        res,
      );
    checkAcount.isDelete = true;
    checkAcount.delete_at = new Date();
    await this.acountRepo.save(checkAcount);
    return AppRes(
      messageDeleteEntities(ENITIES_ENUM.ACOUNT),
      HttpStatus.OK,
      res,
    );
  }
  async update(
    param: DeleteParamDto,
    data: UpdateAcountDto,
    res: Response,
    files?: Array<Express.Multer.File>,
  ) {
    let checkAcount = await this.acountRepo.findOne({
      where: {
        id: param.id,
        isDelete: false,
      },
    });
    if (!checkAcount) {
      files && files['bg'] ? fs.unlinkSync(files['bg'][0].path) : '';
      files && files['avt'] ? fs.unlinkSync(files['avt'][0].path) : '';
      throw new BadRequestException(
        messageNotFoundEntities(ENITIES_ENUM.ACOUNT),
      );
    }
    files && files['bg']
      ? () => {
          data.background = transformImage(files['bg']);
          fs.unlinkSync(files['bg'][0].path);
        }
      : '';
    files && files['avt']
      ? () => {
          data.avatar = transformImage(files['avt']);
          fs.unlinkSync(files['avt'][0].path);
        }
      : '';
    data.avt ? delete data.avt : '';
    data.bg ? delete data.bg : '';
    checkAcount.update_at = new Date();
    await this.acountRepo.save({ ...checkAcount, data });
    return AppRes(
      messageUpdateEntities(ENITIES_ENUM.ACOUNT),
      HttpStatus.OK,
      res,
    );
  }
  async findOne(param: DeleteParamDto, res: Response) {
    const checkAcount = await this.acountRepo.findOne({
      where: {
        id: param.id,
        isDelete: false,
      },
    });
    if (!checkAcount)
      return AppRes(
        messageNotFoundEntities(ENITIES_ENUM.ACOUNT),
        HttpStatus.NOT_FOUND,
        res,
      );
    return AppRes(
      messageGetDetailEntities(ENITIES_ENUM.ACOUNT),
      HttpStatus.OK,
      res,
      checkAcount,
    );
  }
  async findOneByField(data: FieldUnique): Promise<AcountsEntity> {
    return await this.acountRepo.findOne({
      where: data,
    });
  }
  async getAcountsToday() {
    return await this.acountRepo.find({});
  }
}
